# Spec-Driven Development (SDD): Frontend
**Proyecto: Plataforma Inteligente de Gestión de Permisos - Goldfields**

Este documento define la especificación técnica y de producto exclusiva para el ecosistema **Frontend**. Deriva directamente del PRD maestro de Goldfields.

---

## 1. Arquitectura y Stack Tecnológico
*   **Core:** React + Vite, usando TypeScript estricto.
*   **Patrón de Arquitectura:** Arquitectura Basada en Componentes (Component-Based Architecture) con State Management global (Zustand/Redux). NO usar MVC.
*   **Estilos:** Tailwind CSS (estrictos estándares de diseño UI/UX premium).
*   **Gráficos:** Bibliotecas de alta performance (Echarts, Recharts o visx) para renderizar KPIs complejos sin afectar el *frame rate*.

---

## 2. Requerimientos Funcionales / Módulos

### 2.1. Seguimiento de Proyectos (Gantt Integrado)
*   **Vista Macro:** Listado de proyectos activos en la Sidebar.
*   **Layout Combinado (Split View):** Dentro de un proyecto, la pantalla debe albergar simultáneamente:
    *   Una Carta Gantt interactiva.
    *   Una matriz de trackeo de permisos correspondiente a ese proyecto.
*   **Controles Estratégicos:** Interfaz de filtrado dinámico en tiempo real por WBS (Work Breakdown Structure) y por Gerencia (ej. "Mina", "Campamento").
*   **Status Bar (Roll-up):** Barra de progreso general del proyecto ("Adelantado", "Al Día", "Atrasado") que se llena calculando automáticamente los datos subyacentes del *tracking*, sin input manual.

### 2.2. Ficha de Detalle de Permiso (Tracker "ChileExpress")
*   **Timeline Trazable:** Hitos del permiso estructurados visualmente en formato `PLAN | ACTUAL | FORECAST`.
*   **Módulo "Solicitud Legal / Ingeniería":** Sub-barra especializada de progreso para la fase inicial del permiso.
    *   **Gestión de Faltantes:** Highlight visual si un usuario no sube un documento.
    *   **Asignación de Responsabilidad:** Mostar en UI explícitamente qué Área/Persona debe subir el archivo faltante.
    *   **KPI de Retraso:** Etiqueta dinámica mostrando cuántos días de retraso crítico aporta esa omisión a la fecha final de aprobación.

### 2.3. Dashboards Modulares (Basados en Mockups PPT)
Implementación moderna y limpia de las vistas conceptualizadas en los PPTs del cliente:
*   **Tablero Externo (MACRO):** 
    *   Gráficos tipo Dona: Distribución total (Original RCA, Gestiones de Cambio, Total Activos).
    *   Lista de Permisos vs Tramitación en Días Hábiles (vinculada a botones de "Acciones").
*   **Visores Segmentados:**
    *   Filtros tipo pestaña/dropdown por *Macrozona*, *Gerencia Responsable* y *Autoridad* / *Contratista*.
    *   Alertas rojas para "Caducidad inminente" y "Permisos críticos por renovar".
*   **Tablero Interno (Presupuestos):** Módulo tipo Curva S visualizando el avance presupuestario contractual vs tiempo, y listado tabular de Entregables del Contratista vs Plan.

---

## 3. Integración de Servicios
*   Consumirá la API REST del **Backend Transaccional (Python/FastAPI)** para operaciones CRUD.
*   Consumirá *Server-Sent Events* (SSE) o *WebSockets* desde el **Microservicio de Agentes IA** para instanciar en UI las alertas del Agente Nocturno o chatear asíncronamente con el Asistente RAG, asegurando que la interfaz no se congele durante el procesamiento LLM.

---

## 4. Implementation Plan: Advanced Project Analytics

### Proposed Changes

**Routing & Navigation**
*   **[MODIFY]** `App.tsx`: Agregar nueva ruta `<Route path="project-analytics/:id" element={<ProjectAnalytics />} />`.
*   **[MODIFY]** `ProjectDashboard.tsx`: Actualizar el botón Ver más del Universo Total de Permisos para que navegue hacia la nueva ruta `/project-analytics/${id}`.

**Nueva Página Analítica**
*   **[NEW]** `ProjectAnalytics.tsx`: Se creará esta página consolidada con los siguientes elementos organizados en 3 secciones bajando (scroll) o mediante pestañas:
    *   **Header**: Título dinámico "Permisos del Proyecto {projectName}".
    *   **Sección 1 (Macrozona)**:
        *   3 Gráficos de anillo (Donuts): Sector Campamento, Sector Mina-Planta, Sector Suministro Hídrico.
        *   Gráfico de barras apilado (Pendientes por Gerencia): Colores Azul oscuro (No iniciado), Beige plata (En elaboración), Verde (En trámite).
        *   Gráfico de barras apilado (Requerimientos de Información por Gerencia): Colores Azul oscuro (Total) y Beige plata (Entregados). Tendrá un evento `onClick` interactivo que simule la revisión del entregable atrasado específico enviando al usuario de vuelta al Tracker de ProjectDashboard.
    *   **Sección 2 (Tipos y Contratistas)**:
        *   3 Gráficos de anillo: Según Autoridad, Según tipo de permiso, Según Contratista.
        *   Gráfico de barras apilado (Pendientes por Contratista): Colores Azul oscuro (No iniciado), Beige plata (En elaboración), Verde (En trámite).
    *   **Sección 3 (Caducidad y Renovación)**:
        *   3 Gráficos de anillo con leyendas descriptivas específicas ("Permisos con caducidad", "Requieren renovación", "Críticos que requieren renovación"). Incorporaremos iconos (i) informativos que despliegan los textos solicitados al hacer hover.
        *   Gráfico de barras apilado (Renovación por Gerencia Responsable): Colores Azul oscuro (No iniciado), Beige plata (En elaboración), Verde (En trámite).

### Verification Plan

**Manual Verification**
*   Abrir navegador en el `ProjectDashboard`.
*   Verificar que al hacer clic en "Ver más" de la sección Universo Total de Permisos nos lleve a la página de Análisis.
*   Revisar cada gráfico y verificar que sus tooltips (hover) y layendas sean los indicados y que cumplan con los colores (Azul oscuro, Beige plata, Verde).
*   Hacer clic en una barra del gráfico de "Gerencias con pendientes de respuestas a requerimientos". Verificar que el evento `onClick` intercepte la acción y dispare una alerta o navegación contextual que simule la corrección.
