# Docker

The app is a Vite-built, client-side React application. Docker uses a two-stage
build: Node.js builds the static site; Nginx serves `dist/`. Firebase Authentication
and Realtime Database remain hosted by Firebase (there is no local database
container).

## Prerequisites

- Docker Desktop / Docker Engine with Docker Compose v2.
- A Firebase project configured according to the main README.
- A local `.env.local` based on `.env.sample`, with all seven `VITE_FB_*` values.

## Start the application

From the project root, run:

```bash
docker compose --env-file .env.local up --build -d
```

Open **http://localhost:8080**. To view logs or stop the container:

```bash
docker compose logs -f web
docker compose down
```

Test that the React Router fallback works by navigating to a nested route, e.g.
`http://localhost:8080/sign-in`, and refreshing the page. Sign-in with Google
may require adding `localhost` to **Firebase Authentication > Settings >
Authorized domains** (for development only). Firebase access and security rules
are unchanged by Docker.

## Configuration and security

The `VITE_FB_*` variables are embedded into the Javascript bundle **at build
time** by Vite. Compose reads the values from the host's `.env.local` and passes
them as build arguments; `.dockerignore` excludes `.env.local` from the Docker
build context. This does *not* hide these values from users of the browser app:
Firebase web-app configuration is intended to be public. Never supply Firebase
Admin credentials, private keys, passwords or other secrets through `VITE_*`.

**Changing `.env.local` requires rebuilding the image** with the same command.
`docker compose up` without `--build` will not inject new configuration.

By design, the container serves only static assets; there is no Node.js server
or Firebase emulator in the running image. The container will need Internet
access to communicate with Firebase APIs. Use only demo/test data with the
project's learning-exercise Firebase database rules.

## Quick troubleshooting

- **Build says a variable is missing:** create/fill `.env.local`, with the exact
  mixed-case names from `.env.sample`.
- **Port 8080 is taken:** edit the host part of `"8080:80"` in `compose.yaml`.
- **Page loads but Firebase authentication fails:** check Firebase project
  settings and the `localhost` authorized domain.
- **Employee search or database reads fail:** confirm the Realtime Database URL
  and publish the rules in `database.rules.json` to your Firebase project.
