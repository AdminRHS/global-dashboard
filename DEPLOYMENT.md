# Deployment Guide

Complete deployment instructions for Global Dashboard on Google Cloud VM.

## Prerequisites

- Google Cloud VM with Docker + Traefik already configured
- Domain: `dashboard.anyemp.com` (DNS configured)
- GitHub access to this repository
- SSH access to VM: `gcloud compute ssh dd@microservices-vm --zone=europe-central2-a`

## Quick Deploy (For Developers)

### 1. SSH to VM

```bash
gcloud compute ssh dd@microservices-vm --zone=europe-central2-a
```

### 2. Clone Repository

```bash
cd /home/dd/apps
git clone https://github.com/AdminRHS/global-dashboard.git
cd global-dashboard
```

### 3. Build Docker Image

Use the provided Dockerfile:

```bash
docker build -t global-dashboard:latest .
```

### 4. Deploy with docker-compose

```bash
docker-compose up -d
```

### 5. Verify Deployment

```bash
curl http://localhost:3000
# Should return HTML with "Global Dashboard"

# Check logs
docker-compose logs -f
```

### 6. Access Dashboard

Open: https://dashboard.anyemp.com

---

## Detailed Deployment Steps

### Step 1: Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Multi-stage build for Global Dashboard

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Nginx Configuration

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name dashboard.anyemp.com;

    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
    gzip_min_length 1024;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Serve static files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy Yellow Card API endpoints
    location /api/get-employees {
        proxy_pass https://yc.anyemp.com/api/get-employees;
        proxy_set_header Host yc.anyemp.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_ssl_server_name on;
        proxy_ssl_verify off;
    }

    location /api/add-violation {
        proxy_pass https://yc.anyemp.com/api/add-violation;
        proxy_set_header Host yc.anyemp.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_ssl_verify off;
    }

    location /api/add-green-card {
        proxy_pass https://yc.anyemp.com/api/add-green-card;
        proxy_set_header Host yc.anyemp.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_ssl_verify off;
    }

    location /api/delete-violation {
        proxy_pass https://yc.anyemp.com/api/delete-violation;
        proxy_set_header Host yc.anyemp.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_ssl_verify off;
    }

    location /api/delete-green-card {
        proxy_pass https://yc.anyemp.com/api/delete-green-card;
        proxy_set_header Host yc.anyemp.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_ssl_verify off;
    }

    # Proxy HR Attendance API
    location /api/attendance {
        proxy_pass https://attendance.anyemp.com/api/attendance;
        proxy_set_header Host attendance.anyemp.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_ssl_server_name on;
        proxy_ssl_verify off;
    }
}
```

### Step 3: docker-compose.yml

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  dashboard:
    image: global-dashboard:latest
    container_name: global-dashboard
    restart: unless-stopped
    ports:
      - "3000:80"
    networks:
      - traefik-network
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dashboard.rule=Host(`dashboard.anyemp.com`)"
      - "traefik.http.routers.dashboard.entrypoints=websecure"
      - "traefik.http.routers.dashboard.tls=true"
      - "traefik.http.routers.dashboard.tls.certresolver=letsencrypt"
      - "traefik.http.services.dashboard.loadbalancer.server.port=80"
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 10s

networks:
  traefik-network:
    external: true
```

### Step 4: Build & Deploy Script

Create `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Deploying Global Dashboard..."

# Pull latest code
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Build Docker image
echo "🔨 Building Docker image..."
docker build -t global-dashboard:latest .

# Stop existing container
echo "🛑 Stopping existing container..."
docker-compose down || true

# Start new container
echo "✅ Starting new container..."
docker-compose up -d

# Wait for health check
echo "⏳ Waiting for health check..."
sleep 10

# Check status
echo "📊 Container status:"
docker-compose ps

# Show logs
echo "📝 Recent logs:"
docker-compose logs --tail=50

echo "✅ Deployment complete!"
echo "🌐 Dashboard: https://dashboard.anyemp.com"
```

Make executable:

```bash
chmod +x deploy.sh
```

---

## Environment Variables

No environment variables required for basic deployment.

Optional (for future use):

```bash
# .env (not currently used)
VITE_YELLOW_CARD_API=https://yc.anyemp.com/api
VITE_ATTENDANCE_API=https://attendance.anyemp.com/api
```

---

## Traefik Integration

Traefik should already be running on the VM. Verify:

```bash
docker ps | grep traefik
```

If Traefik labels in docker-compose.yml are correct, it will automatically:
- Generate SSL certificate via Let's Encrypt
- Route traffic from dashboard.anyemp.com to container
- Enable HTTPS

---

## Monitoring

### Check Logs

```bash
docker-compose logs -f dashboard
```

### Check Health

```bash
docker inspect global-dashboard | grep -A 10 Health
```

### Test API Endpoints

```bash
# Test Yellow Card API
curl https://dashboard.anyemp.com/api/get-employees

# Test HR Attendance API
curl https://dashboard.anyemp.com/api/attendance
```

---

## Updates & Maintenance

### Update from GitHub

```bash
cd /home/dd/apps/global-dashboard
./deploy.sh
```

### Rollback (if needed)

```bash
# List available images
docker images | grep global-dashboard

# Rollback to previous image
docker tag global-dashboard:latest global-dashboard:backup
docker-compose up -d
```

### Clean Old Images

```bash
docker image prune -a
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs dashboard

# Check Nginx config syntax
docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf nginx:alpine nginx -t
```

### API endpoints not working

```bash
# Test inside container
docker exec -it global-dashboard sh
wget http://localhost/api/get-employees
wget http://localhost/api/attendance
```

### SSL certificate issues

```bash
# Check Traefik logs
docker logs traefik

# Verify DNS
nslookup dashboard.anyemp.com
```

### Memory issues

```bash
# Check container stats
docker stats global-dashboard

# Increase memory limit in docker-compose.yml
services:
  dashboard:
    mem_limit: 512m
```

---

## Performance Optimization

### Enable HTTP/2

Already enabled if using Traefik with HTTPS.

### CDN (Optional)

If needed, use Cloudflare or similar CDN in front of dashboard.anyemp.com for:
- Global caching
- DDoS protection
- Additional SSL layer

---

## Security Checklist

- ✅ HTTPS enabled (via Traefik + Let's Encrypt)
- ✅ Security headers in Nginx config
- ✅ No environment secrets in code
- ✅ Gzip compression enabled
- ✅ Health checks configured
- ✅ Container restart policy set
- ⚠️ Yellow Card API requires PIN (handle in frontend)

---

## Contact

**Issues or Questions?**
- Nikolay Artemchuk (EMP-37226, AID Department)
- GitHub Issues: https://github.com/AdminRHS/global-dashboard/issues

**Last Updated:** February 11, 2026
