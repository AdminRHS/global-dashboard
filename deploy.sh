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
