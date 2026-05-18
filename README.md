# Gold Fields Permit Frontend — Aplicación Web

Este es el frontend de la plataforma Goldfields, construido con **React 19 + TypeScript + Vite** y estilizado con **Tailwind CSS v4**.

El código principal de la aplicación vive en la carpeta `src/`.

---

## Estructura del Proyecto

```
goldfieldsPermitFrontend/
├── src/
│   ├── App.tsx              # Rutas principales (React Router)
│   ├── main.tsx             # Punto de entrada
│   ├── index.css            # Estilos globales (Tailwind)
│   │
│   ├── pages/               # Vistas principales (una por ruta)
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ProjectDashboard.tsx
│   │   ├── ProjectAnalytics.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── HistoricalProjects.tsx
│   │   ├── ActiveProjects.tsx
│   │   ├── Tracker.tsx
│   │   ├── PermitDetail.tsx
│   │   ├── Gantt.tsx
│   │   ├── Calendar.tsx
│   │   ├── Commitments.tsx
│   │   └── PredictiveAnalysis.tsx
│   │
│   ├── components/          # Componentes reutilizables
│   │   ├── Layout.tsx       # Layout principal con sidebar
│   │   ├── Sidebar.tsx      # Navegación lateral
│   │   ├── GanttChart.tsx   # Gráfico de Gantt de hitos
│   │   └── AIChatBot.tsx    # Chatbot integrado con el microservicio de agentes
│   │
│   ├── types/               # Tipos TypeScript compartidos
│   └── data/                # Datos estáticos y mocks de desarrollo
│
├── parsed_data.json         # Datos parseados desde el Excel (fuente del seeder)
├── parse_excel.mjs          # Script de parseo del Excel original
├── package.json
└── vite.config.ts
```

---

## Cómo ejecutar el frontend localmente

### 1. Ubícate en la raíz del proyecto

```powershell
cd D:\ValueStrategyConsulting\Goldfields\goldfieldsPermitFrontend
```

### 2. Instala las dependencias

Si es la primera vez que ejecutas el proyecto:

```powershell
npm install
```

### 3. Inicia el servidor de desarrollo

```powershell
npm run dev
```

¡Listo! El frontend estará disponible en `http://localhost:5173`.

---

## Comando Rápido (Copiar y Pegar)

Si ya tienes las dependencias instaladas:

```powershell
npm run dev
```

---

## Scripts disponibles

| Comando         | Descripción                                      |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Inicia el servidor de desarrollo con HMR         |
| `npm run build` | Compila TypeScript y genera el bundle de producción en `dist/` |
| `npm run lint`  | Ejecuta ESLint sobre todo el proyecto            |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## Dependencias principales

| Paquete           | Versión   | Uso                                      |
|-------------------|-----------|------------------------------------------|
| React             | ^19.2.0   | UI framework                             |
| React Router DOM  | ^7.13.1   | Navegación entre páginas                 |
| Recharts          | ^3.7.0    | Gráficos (donuts, barras, líneas)        |
| Tailwind CSS      | ^4.2.1    | Estilos utilitarios                      |
| Lucide React      | ^0.577.0  | Iconos                                   |
| xlsx              | ^0.18.5   | Parseo del archivo Excel                 |

---

## Conexión con el Backend

El frontend consume la API del backend en `http://localhost:8001/api/v1`.

Asegúrate de tener el backend corriendo antes de levantar el frontend:

```powershell
# En goldfieldsPermitBackend/
.\venv\Scripts\activate; uvicorn app.main:app --reload --port 8001
```

El chatbot de IA consume el microservicio de agentes en `http://localhost:8000/api/orchestrate`.

---

## Parseo del Excel

Para regenerar el `parsed_data.json` desde el Excel original:

```powershell
node parse_excel.mjs
```

> Este archivo es la fuente de datos para el seeder del backend (`python -m app.seed_from_excel`).

---

## Gestión de Dependencias

### Instalar desde cero

```powershell
npm install
```

### Instalar un nuevo paquete

```powershell
npm install nombre-del-paquete
```
