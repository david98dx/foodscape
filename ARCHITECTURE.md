# Arquitectura y Stack — Foodscape

**Resumen:**
- **Frontend:** Next.js (app router, Tailwind preparado). Ejecuta en `localhost:3000`.
- **Backend:** NestJS (API REST, Swagger). Ejecuta en `localhost:3001`.
- **Runtime:** Node 22 (recomendado). Usamos `nvm` para gestionar la versión.
- **Contrato API:** OpenAPI v3 en `api-contracts/api.yaml` (para consumo móvil y frontend).
- **Base de datos:** MySQL (planificada; no configurada aún).
- **Repositorio:** https://github.com/david98dx/foodscape

**Frontend (Next.js)**:
- **Stack:** Next.js 16, React 19, Tailwind (plantilla `app-tw`).
- **Carpeta:** [frontend](frontend)
- **Dev:** `cd frontend && npm run dev` (sirve en `:3000`).
- **Notas:** `package.json` incluye `engines.node: 22` — usa Node 22 localmente.

**Backend (NestJS)**:
- **Stack:** NestJS minimal scaffold, Swagger para docs, TypeScript.
- **Carpeta:** [backend](backend)
- **Entrada:** [backend/src/main.ts](backend/src/main.ts) (arranca en `:3001`).
- **Dev:** `cd backend && npx ts-node-dev --respawn --transpile-only src/main.ts` (requiere `typescript` y `ts-node-dev` instalados).
- **API docs (Swagger):** `http://localhost:3001/api/docs` (generadas en runtime por Nest + Swagger).

**Contrato API / OpenAPI**:
- Archivo canonical: [api-contracts/api.yaml](api-contracts/api.yaml)
- Rutas iniciales: `GET /foods`, `POST /foods` con esquemas `Food` y `FoodCreate`.
- Uso: el frontend y la futura app Android deben sincronizar con este YAML como fuente de verdad.

**Base de datos (planificada)**:
- Motor: MySQL (conexión y migraciones a definir). Por ahora el backend usa respuestas mock en `AppController`.

**Git & CI**:
- Repo remoto: `git@github.com:david98dx/foodscape.git` (SSH). Clave `id_ed25519_personal_correcta` añadida a `david98dx`.
- Recomendación CI: pipeline que ejecute `npm install` y `npm run build` para `frontend` y `backend`, y `npm test` cuando haya tests.

**SSH / Múltiples cuentas GitHub**:
- Se configuraron aliases SSH en `~/.ssh/config` (por ejemplo `github-david98dx`) para usar distintas claves por cuenta.

**Comandos útiles**:
```
# usar Node 22
nvm install 22; nvm use 22

# instalar deps
cd frontend && npm install
cd ../backend && npm install

# arrancar en desarrollo
cd frontend && npm run dev
cd ../backend && npx ts-node-dev --respawn --transpile-only src/main.ts
```

**Puertos por defecto**:
- Frontend: `3000`
- Backend: `3001`

**Siguientes pasos sugeridos**:
- Añadir integración con MySQL (config env + ORM/TypeORM/Prisma).
- Añadir tests unitarios y e2e para backend y frontend.
- Configurar CI (GitHub Actions) que construya y ejecute linters/tests.
- Publicar spec OpenAPI automáticamente desde Nest o mantener `api-contracts/api.yaml` como fuente canónica.

Si quieres, hago un commit del archivo y configuro un pipeline de CI básico. ¿Procedo?
