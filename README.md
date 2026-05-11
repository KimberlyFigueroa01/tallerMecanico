# 🚗 Taller Mecánico - Sistema Multi-Tenant Dinámico

Sistema integral de gestión para talleres mecánicos desarrollado con las últimas tecnologías web. Esta aplicación permite gestionar múltiples talleres (tenants) desde un único despliegue, adaptando su identidad visual (logos y colores) en tiempo real.

## 🚀 Stack Tecnológico

- **Frontend**: Angular 21 (vanguardia absoluta).
- **Renderizado**: Angular SSR (Server-Side Rendering) para máxima velocidad y SEO.
- **Estilos**: Tailwind CSS v4 (motor de alto rendimiento con variables CSS dinámicas).
- **Despliegue**: Render (Web Service).
- **Arquitectura**: Multi-tenant basada en Signals y CSS Custom Properties.

## 🎨 Sistema Multi-Tenant Dinámico

A diferencia de las aplicaciones tradicionales, este proyecto utiliza un **único despliegue** para servir a múltiples clientes. La identidad visual se inyecta dinámicamente:

1.  **Tailwind v4 Dinámico**: Los colores (`bg-primary`, `text-primary`) están conectados a variables CSS (`--app-primary`) que cambian sin recargar la página.
2.  **Branding Reactivo**: Los logos y nombres de taller se gestionan mediante **Angular Signals**, asegurando que toda la interfaz se actualice instantáneamente al cambiar de taller.

## 🧪 Cómo realizar pruebas (Despliegue en Render)

La aplicación está configurada para detectar el taller mediante un parámetro en la URL. Puedes probar los diferentes "tenants" usando los siguientes enlaces:

- **Taller Andrés (Default)**: [tu-app.onrender.com/?taller=andres](https://taller-mecanico-frontend.onrender.com/?taller=andres)
    - *Identidad*: Color Verde, Logo de Andrés.
- **Taller Edwin**: [tu-app.onrender.com/?taller=edwin](https://taller-mecanico-frontend.onrender.com/?taller=edwin)
    - *Identidad*: Color Rojo, Logo de Edwin.

### Prueba de Cambio en Tiempo Real (Consola)
Si quieres ver la magia de Tailwind v4 y los Signals en acción, ejecuta esto en la consola del navegador:

```javascript
// Cambiar a tema Edwin instantáneamente
const configService = ng.getComponent(document.querySelector('app-root')).configService;
configService.aplicarPorNombre('edwin');
```

## 🛠️ Guía de Desarrollo

### Requisitos
- Node.js v22+
- Angular CLI v21+

### Instalación
```bash
npm install
```

### Ejecución Local
```bash
# Servidor de desarrollo con SSR
npm run start
```

### Construcción para Producción
```bash
# Build optimizado con límite de memoria para Render Free Tier
npm run build
```

## 🔐 Módulos Principales
- **Auth**: Gestión de sesiones y recuperación de contraseñas.
- **Órdenes**: Flujo completo de reparación desde diagnóstico hasta entrega.
- **Clientes & Vehículos**: Gestión centralizada de activos y propietarios.
- **Inventario**: Control de stock con alertas de nivel bajo.
- **Pagos**: Generación de facturas dinámicas con branding del taller.

## 👥 Créditos
Proyecto desarrollado por:
- **Kimberly Natalia Figueroa Zapata**
- **Edwin David Martínez Gómez**

---
*Desarrollado para la asignatura de Electiva II - 9no Semestre - UPTC*