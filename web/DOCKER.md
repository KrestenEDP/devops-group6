# Docker Setup for React Frontend

This directory contains Docker configuration for the React frontend application.

## Files Created

- `Dockerfile` - Production build with nginx
- `Dockerfile.dev` - Development build 
- `docker-compose.yml` - Docker Compose configuration
- `.dockerignore` - Files to exclude from Docker build
- `nginx.conf` - Custom nginx configuration

## Usage

### Development Mode

Run the development server with hot reloading:

```bash
# Using Docker Compose with Docker Watch (recommended)
docker-compose watch

# Or using Docker Compose without watch
docker-compose up web-dev

# Or build and run manually
docker build -f Dockerfile.dev -t web-dev .
docker run -p 3000:3000 -v "${PWD}/src:/app/src" -v "${PWD}/public:/app/public" web-dev

# Run tests
docker-compose run web npm test
```

The application will be available at http://localhost:3000

#### Docker Watch Benefits
- **Instant sync**: Changes to `/src` and `/public` are immediately synced to the container
- **Smart rebuilds**: Container rebuilds only when `package.json` or `package-lock.json` change
- **Better performance**: More efficient than volume mounting for file watching

### Production Mode

Build and run the production version:

```bash
# Using Docker Compose
docker-compose --profile prod up web-prod

# Or build and run manually
docker build -t web-prod .
docker run -p 8080:80 web-prod
```

The application will be available at http://localhost:8080

### Building for Deployment

Build the production image for deployment:

```bash
docker build -t your-registry/web:latest .
docker push your-registry/web:latest
```

## Docker Watch Setup

Docker Watch provides efficient file synchronization and smart rebuilds for development.

### Configuration
The `docker-compose.yml` includes watch configuration:
- **Sync**: `/src` and `/public` directories sync instantly
- **Rebuild**: Triggers when `package.json` or `package-lock.json` change
- **Ignore**: Excludes `node_modules` from syncing

### Usage
```bash
# Start with Docker Watch
docker-compose watch

# Stop Docker Watch
Ctrl+C or docker-compose down
```

## Features

- Multi-stage build for optimized production images
- Docker Watch for efficient development workflow
- Hot reloading in development mode
- Custom nginx configuration with:
  - React Router support (SPA routing)
  - Static asset caching
  - Security headers
  - Gzip compression
- Volume mounting for development workflow
- Separate dev and prod configurations

## Environment Variables

You can set environment variables in the docker-compose.yml or pass them to docker run:

```bash
docker run -p 3000:3000 -e REACT_APP_API_URL=http://localhost:8080 web-dev
```