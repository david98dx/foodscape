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

**Adopción de SDD (Specification-Driven Development)**

- **Metodología:** Usaremos SDD (Specification-Driven Development) apoyada en OpenSpec (Fission-AI/openspec) como flujo principal para diseñar, validar y generar artefactos a partir de las especificaciones.
- **Dónde:** La especificación canonical viva estará en `docs/openspec` (copia sincronizada desde el submódulo `docs/openspec-submodule`). El contrato OpenAPI canonical continúa en `api-contracts/api.yaml` y deberá sincronizarse con la especificación SDD cuando corresponda.
- **Flujo de trabajo del desarrollador:**
	- Escribir o actualizar la especificación en `docs/openspec` (OpenSpec format / OpenAPI fragments según corresponda).
	- Ejecutar localmente validaciones y generación de artefactos (ver comandos abajo) y abrir un PR con la spec y cambios generados.
	- El PR debe incluir: la spec actualizada, pruebas de contrato (si aplica) y los artefactos generados (clientes/validadores) o instrucciones para generarlos en CI.
	- En merge, un job de CI valida la spec y actualiza `api-contracts/api.yaml` y/o los clientes/servicios generados automáticamente.
- **Automatización ya añadida:** existe `scripts/sync-openspec.sh` y el workflow `.github/workflows/sync-openspec.yml` que mantienen `docs/openspec` sincronizado desde el submódulo y permiten operaciones programadas/manuales.
- **Generación y validación (recomendado):** usar herramientas compatibles con OpenAPI/OpenSpec para:
	- Validar formato y esquemas (lint/validator).
	- Generar clientes TypeScript para el frontend (openapi-generator, or other generator).
	- Generar stubs/validators para backend (si se desea código esqueleto o validación automática).
- **CI sugerido para SDD:** añadir pasos en CI que al merge:
	1. Validen `docs/openspec` (lint/validator).
	2. Generen/compilen clientes y servidores (si aplica) y los publiquen en una carpeta `generated/` o commit automático usando `GITHUB_TOKEN`.
	3. Actualicen `api-contracts/api.yaml` si la versión canónica cambia.
- **Reglas de convivencia:** la especificación SDD (docs/openspec) y `api-contracts/api.yaml` deben ser fuentes sincronizables; preferir una sola fuente canónica por endpoint para evitar desalineos. Definir en PR template si la spec o el contrato son la fuente de verdad para ese cambio.

**Comandos útiles relacionados con SDD**
```
# validar spec (ejemplo genérico — adaptar a la herramienta elegida)
cd docs/openspec && openspec-cli lint .

# generar cliente TS (ejemplo con openapi-generator-cli)
openapi-generator-cli generate -i api-contracts/api.yaml -g typescript-fetch -o frontend/generated-client

# sincronizar manualmente desde submódulo (ya hay script)
./scripts/sync-openspec.sh
```

Si quieres, puedo: 1) añadir jobs CI que validen la spec en cada PR; 2) configurar generación automática de cliente TypeScript en CI; o 3) escribir una pequeña guía de PR para cambios en la spec. ¿Cuál prefieres que haga ahora?

Si quieres, hago un commit del archivo y configuro un pipeline de CI básico. ¿Procedo?
