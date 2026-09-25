# Foodscape

Monorepo con frontend (Next.js) y backend (NestJS).

Requisitos:
- Node 22 (usa `nvm use` o instala Node 22)
- npm

Arrancar en desarrollo:

# Frontend
cd frontend
npm run dev

# Backend
cd backend
# para desarrollo con reinicio automático (instala ts-node-dev)
npm run start:dev

API docs (Swagger): http://localhost:3000/api/docs

Notas:
- El contrato OpenAPI está en `api-contracts/api.yaml`.
- La base de datos será MySQL más adelante; actualmente el backend es un scaffold mínimo con rutas de ejemplo en `backend/src/app.controller.ts`.

Comandos útiles:

- Instalar dependencias (raíz ya contiene `frontend` y `backend`):
  - `cd frontend && npm install`
  - `cd backend && npm install`

- Crear repo remoto y push ya realizado: https://github.com/david98dx/foodscape
