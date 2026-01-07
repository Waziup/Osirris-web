# Docker Deployment Guide

This guide explains how to deploy the Osirris web application on your own server using Docker.

## Prerequisites

- Docker installed ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed ([Install Docker Compose](https://docs.docker.com/compose/install/))
- Server with at least 2GB RAM
- Port 3000 available (or configure in docker-compose.yml)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/keya254/Osirris-web.git
cd Osirris-web
```

### 2. Build and Run with Docker Compose

```bash
# Build the Docker image
docker-compose build

# Start the application
docker-compose up -d

# View logs
docker-compose logs -f osirris-web
```

The application will be available at `http://localhost:3000`

### 3. Stop the Application

```bash
docker-compose down
```

---

## Manual Docker Commands

If you prefer using Docker directly without Compose:

### Build the Image

```bash
docker build -t osirris-web:latest .
```

### Run the Container

```bash
docker run -d \
  --name osirris-web \
  -p 3000:3000 \
  -v $(pwd)/public/uploads:/app/public/uploads \
  -v $(pwd)/content:/app/content \
  --restart unless-stopped \
  osirris-web:latest
```

### View Logs

```bash
docker logs -f osirris-web
```

### Stop the Container

```bash
docker stop osirris-web
docker rm osirris-web
```

---

## Configuration

### Environment Variables

Create a `.env.production` file for production settings:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

Then update `docker-compose.yml` to include:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_API_URL=https://yourdomain.com
```

### Port Configuration

To use a different port (e.g., 8080):

**docker-compose.yml:**
```yaml
ports:
  - "8080:3000"
```

Then access at `http://localhost:8080`

### Persistent Storage

The docker-compose.yml already mounts:
- `/public/uploads` - For uploaded media files
- `/content` - For Tina CMS content

These directories persist between container restarts.

---

## Production Deployment

### Using Nginx as Reverse Proxy

Uncomment the Nginx service in `docker-compose.yml`:

```yaml
nginx:
  image: nginx:alpine
  container_name: osirris-nginx
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf:ro
    - ./ssl:/etc/nginx/ssl:ro
  depends_on:
    - osirris-web
  networks:
    - osirris-network
```

### SSL/HTTPS Setup

1. Create `ssl` directory:
```bash
mkdir -p ssl
```

2. Add your SSL certificates:
```bash
cp /path/to/cert.pem ssl/
cp /path/to/key.pem ssl/
```

3. Create `nginx.conf` for SSL configuration

### Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Certificates will be in /etc/letsencrypt/live/yourdomain.com/
```

---

## Monitoring and Maintenance

### Check Container Status

```bash
docker-compose ps
```

### View Resource Usage

```bash
docker stats osirris-web
```

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build
```

### Backup Data

```bash
# Backup uploads
tar -czf uploads-backup.tar.gz public/uploads/

# Backup content
tar -czf content-backup.tar.gz content/
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs osirris-web

# Check if port is in use
sudo lsof -i :3000

# Kill process on port 3000
sudo kill -9 $(lsof -t -i:3000)
```

### Out of Memory

Increase Docker memory limit in `docker-compose.yml`:

```yaml
services:
  osirris-web:
    mem_limit: 2g
    memswap_limit: 2g
```

### Uploads Not Persisting

Ensure the volumes are correctly mounted:

```bash
# Check volume mounts
docker inspect osirris-web | grep -A 5 Mounts
```

### Slow Performance

1. Check resource usage: `docker stats`
2. Increase container resources
3. Enable caching in Nginx
4. Use CDN for static assets

---

## Advanced: Using Docker Registry

### Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag osirris-web:latest yourusername/osirris-web:latest

# Push image
docker push yourusername/osirris-web:latest
```

### Pull from Registry

```bash
docker pull yourusername/osirris-web:latest
docker run -d -p 3000:3000 yourusername/osirris-web:latest
```

---

## Performance Tips

1. **Enable Gzip Compression** - Configure in Nginx
2. **Use CDN** - For static assets
3. **Enable Caching** - Set appropriate cache headers
4. **Monitor Logs** - Regular log rotation
5. **Resource Limits** - Set memory and CPU limits

---

## Security Best Practices

1. ✅ Run as non-root user (nextjs user)
2. ✅ Use environment variables for secrets
3. ✅ Enable HTTPS/SSL
4. ✅ Regular security updates
5. ✅ Firewall rules
6. ✅ Regular backups

---

## Support

For issues or questions:
- Check logs: `docker-compose logs osirris-web`
- Review Docker documentation: https://docs.docker.com/
- Check Next.js documentation: https://nextjs.org/docs

---

**Happy Deploying! 🚀**
