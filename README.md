# GDG on Campus DGI Website

Official website for Google Developer Groups on Campus at Dronacharya Group of Institutions. The repository contains the public website, event flows, authentication, and the admin event-management experience.

## Overview

- `frontend/`: Next.js 16 app with TypeScript, Tailwind CSS, animations, and tests.
- `backend/`: Express API for auth and event management.
- `docker-compose.yml`: Production compose used by deployment.
- `docker-compose.dev.yml`: Local development stack for frontend and backend.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Express 5
- MongoDB
- Docker and Docker Compose

## Repository Structure

```text
.
├── backend/               # Express API
├── frontend/              # Next.js application
├── .github/               # CI/CD workflows and templates
├── docker-compose.yml     # Production deployment compose
├── docker-compose.dev.yml # Local development compose
└── Dockerfile.dev         # Optional combined local dev container
```

## Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop (optional, for containerized setup)
- Access to the hosted MongoDB database
- Cloudinary credentials for image uploads

## Environment Variables

Create the environment files from the provided examples:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Important variables:

- `backend/.env`
  - `MONGO_CONNECTION`
  - `JWT_SECRET`
  - `PORT`
  - `CLOUD_NAME`
  - `API_KEY`
  - `API_SECRET`
- `frontend/.env`
  - `NEXT_PUBLIC_API_URL`
  - `NEXT_PUBLIC_SITE_URL`
- root `.env`
  - `BACKEND_PORT`
  - `FRONTEND_PORT`

## Local Development

### Option 1: Run without Docker

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

3. Start the backend:

```bash
cd backend
npm run dev
```

4. Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

5. Open the app:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend health endpoint: [http://localhost:4000/test](http://localhost:4000/test)

### Option 2: Run with Docker Compose

1. Ensure the three env files exist:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Start the local development stack:

```bash
docker compose -f docker-compose.dev.yml up --build
```

3. Open the app:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000/test](http://localhost:4000/test)

To stop the stack:

```bash
docker compose -f docker-compose.dev.yml down
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

### Backend

```bash
npm run dev
```

## Testing

Frontend tests are configured with Jest:

```bash
cd frontend
npm test
```

## Deployment Notes

- `backend/Dockerfile` builds the production API image.
- `frontend/Dockerfile` builds the production Next.js image.
- `docker-compose.yml` remains the production compose file used by the current deploy workflow.
- `docker-compose.dev.yml` is for local development only and assumes MongoDB is hosted externally.
- Existing GitHub Actions in `.github/workflows/` can be extended to build and deploy the full stack.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

For community expectations, see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Security

If you discover a security issue, please follow [SECURITY.md](SECURITY.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Community

- GDG Community page: [GDG on Campus Dronacharya Group of Institutions](https://gdg.community.dev/gdg-on-campus-dronacharya-group-of-institutions-greater-noida-india/)
- Repository: [ansh-logics/GDGOC-DGI-Website](https://github.com/ansh-logics/GDGOC-DGI-Website)
