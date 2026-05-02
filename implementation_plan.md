# AutoGest — Implementación Completa (10 Fases)

Aplicación Angular 21 multi-tenant para gestión de talleres mecánicos. El proyecto tiene la estructura de carpetas ya scaffoldeada con componentes stub (solo `<p>X works!</p>`). La tarea es implementar completamente cada fase.

## Estado Actual del Proyecto

- **Angular 21.2** con standalone components, SSR habilitado
- **Multi-tenant** vía `environment.ts` con `fileReplacements` en angular.json (2 tenants: tallerAndres, tallerEdwin)
- **Componentes existentes**: Todos son stubs vacíos (solo clase + template placeholder)
- **LoginComponent**: Único componente parcialmente implementado (FormsModule, ngModel, CSS con variables)
- **AuthService (AutenticacionService)**: Funcional con login/logout/getToken/isAuthenticated
- **AuthInterceptor**: Usa patrón legacy class-based (`HttpInterceptor` interface)
- **AuthGuard**: Funcional con `CanActivateFn`
- **Routing**: Plano, sin lazy loading, sin MainLayout shell
- **TailwindCSS 4**: Instalado pero sin uso significativo — se reemplazará con CSS custom properties vanilla
- **NgModules legacy**: Cada feature tiene `*-module.ts` y `*-routing-module.ts` que se migrarán a standalone routes

> [!IMPORTANT]
> El proyecto usa Angular 21 con standalone components. Se migrarán los NgModules legacy a archivos `*.routes.ts` con `Routes[]` exportados. Los archivos `*-module.ts` y `*-routing-module.ts` se mantendrán sin uso activo (no se eliminan para evitar romper imports existentes potenciales), pero la app usará el nuevo routing.

## Open Questions

> [!IMPORTANT]
> **1. Chart library**: El requisito menciona "ngx-charts o Chart.js con wrapper Angular" para el Dashboard. Recomiendo usar **Chart.js con ng2-charts** ya que es más liviano y tiene mejor soporte para Angular 21 standalone. ¿Procedo con esta opción?

> [!IMPORTANT]  
> **2. SSR y localStorage**: El proyecto tiene SSR habilitado. Todos los accesos a `localStorage` y `document` necesitan guards con `isPlatformBrowser()`. ¿Deseas mantener SSR activo o prefieres deshabilitarlo para simplificar?

> [!IMPORTANT]
> **3. TailwindCSS**: El proyecto tiene Tailwind 4 instalado. El requisito pide CSS custom properties vanilla. Recomiendo **remover el import de Tailwind** del `styles.css` y usar 100% vanilla CSS con variables. ¿De acuerdo?

---

## Proposed Changes

### FASE 1 — Infraestructura Base y Tema Dinámico

#### [NEW] [theme.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/services/theme.service.ts)
- Injectable `providedIn: 'root'`
- `init()`: Lee `environment.theme` y aplica CSS custom properties en `document.documentElement`
- Guard `isPlatformBrowser` para SSR safety
- Properties: `--primary-color`, `--secondary-color`, `--background-color`

#### [NEW] [error.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/services/error.service.ts)
- BehaviorSubject para errores globales
- Método `showError(message)` y `showSuccess(message)`
- Consumido por ToastComponent en MainLayout

#### [NEW] [base-response.model.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/models/base-response.model.ts)
- `BaseResponse<T> { data: T; message: string; success: boolean; }`

#### [NEW] [user.model.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/models/user.model.ts)
- Interfaz User con id, nombre, email, role, avatar

#### [MODIFY] [auth.interceptor.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/interceptors/auth.interceptor.ts)
- Migrar de class-based a functional interceptor (`HttpInterceptorFn`)
- Token key: `ag_token`
- En 401 → redirige a `/auth/login`

#### [NEW] [api.interceptor.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/interceptors/api.interceptor.ts)
- Antepone `environment.apiUrl` a peticiones relativas (no empiezan con `http`)

#### [MODIFY] [app.config.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/app.config.ts)
- Usar `provideHttpClient(withInterceptors([authInterceptor, apiInterceptor]), withFetch())`
- Eliminar `HTTP_INTERCEPTORS` class-based

#### [MODIFY] [styles.css](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/styles.css)
- Remover `@import 'tailwindcss'`
- Agregar `:root` con todas las variables CSS
- Agregar reset CSS básico, tipografía Inter de Google Fonts
- Variables: `--header-bg`, `--header-text`, `--border-color`, `--success`, `--warning`, `--danger`, `--info`

#### [MODIFY] [app.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/app.ts)
- Inyectar ThemeService y llamar `init()` en `OnInit`

#### [MODIFY] [index.html](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/index.html)
- Agregar link a Google Fonts (Inter)
- Meta description para SEO

---

### FASE 2 — Routing General

#### [MODIFY] [app.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/app.routes.ts)
- Reescribir completamente con lazy loading
- MainLayoutComponent como shell
- AuthGuard en rutas protegidas
- RoleGuard en admin

#### [NEW] [auth.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/auth/auth.routes.ts)
- `AUTH_ROUTES`: login, forgot

#### [NEW] [clientes.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/clientes/clientes.routes.ts)
- `CLIENTES_ROUTES`: list, :id, nuevo, :id/editar

#### [NEW] [vehiculos.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/vehiculos/vehiculos.routes.ts)
- `VEHICULOS_ROUTES`: list, :id, nuevo, :id/editar, :id/historial

#### [NEW] [ordenes.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/ordenes.routes.ts)
- `ORDENES_ROUTES`: list, :id, nueva, :id/editar, :id/diagnostico

#### [NEW] [inventario.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/inventario/inventario.routes.ts)
- `INVENTARIO_ROUTES`: list, repuesto/nuevo, repuesto/:id, movimientos, alertas, proveedores

#### [NEW] [pagos.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/pagos/pagos.routes.ts)
- `PAGOS_ROUTES`: list, :id, :ordenId/factura, resumen

#### [NEW] [reportes.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/reportes/reportes.routes.ts)
- `REPORTES_ROUTES`: dashboard, ordenes, ingresos, mecanicos, inventario

#### [NEW] [admin.routes.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/admin/admin.routes.ts)
- `ADMIN_ROUTES`: list, :id, planes, uso

#### [NEW] [role.guard.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/auth/role.guard.ts)
- Decodifica JWT, verifica claim `role` contra `data.roles`

---

### FASE 3 — AuthModule

#### [MODIFY] [login.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/auth/login/login.ts)
- Migrar de FormsModule a ReactiveFormsModule
- FormGroup con validators: email (required, email), password (required, minLength 6)
- Mensajes de error inline
- Quitar theme init (ahora lo hace ThemeService)

#### [MODIFY] [login.html](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/auth/login/login.html)
- Reactive forms con formGroup/formControlName
- Validaciones inline
- Link a forgot-password

#### [MODIFY] [login.css](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/auth/login/login.css)
- Refinar estilos: borde 0.5px, sin sombras pesadas, tipografía Inter

#### [MODIFY] [autenticacion.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/auth/login/autenticacion.service.ts)
- Renombrar token key a `ag_token`
- Agregar `BehaviorSubject<User | null>` para usuario actual
- Decodificar JWT para extraer user data
- Endpoint: POST `/auth/login`
- Agregar método `getCurrentUser()`

#### [MODIFY] [auth-guard.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/auth/auth-guard.ts)
- Verificar `ag_token` en localStorage
- Redirigir a `/auth/login`

#### [MODIFY] [forgot-password.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/auth/forgot-password/forgot-password.ts)
- ReactiveForm con campo email
- POST `/auth/forgot-password`
- Estilos consistentes con login

---

### FASE 4 — SharedModule y Layout Shell

#### [NEW] [main-layout.component.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/main-layout/main-layout.ts)
- Shell con navbar + sidebar + `<router-outlet>` + ToastComponent
- Layout: sidebar 200px izquierda, navbar 52px top, content area

#### [MODIFY] [navbar.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/navbar/navbar.ts)
- Logo del taller (environment.theme.logo)
- Nombre del taller (environment.name)
- Avatar usuario
- NotificacionBadgeComponent

#### [MODIFY] [sidebar.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/sidebar/sidebar.ts)
- Menu items array con routerLink
- Item activo con `--primary-color`
- Item Admin solo visible si rol === 'SUPERADMIN'

#### [MODIFY] [status-badge.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/status-badge/status-badge.ts)
- `@Input() status: string`
- Pill con colores: Abierta=azul, En progreso=ámbar, Lista=verde, Cerrada=gris, Alerta=rojo

#### [MODIFY] [table.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/table/table.ts)
- `@Input() columns`, `@Input() rows`
- Paginación y búsqueda integrada
- Columnas uppercase 10px, hover sutil en filas

#### [MODIFY] [confirm-dialog/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/confirm-dialog/)
- Modal con título, mensaje, botón confirmar (danger) y cancelar

#### [MODIFY] [empty-state/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/empty-state/)
- Ícono + título + subtítulo + @Input() para personalizar

#### [MODIFY] [loading-spinner/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/loading-spinner/)
- Overlay semitransparente con spinner animado

#### [MODIFY] [breadcrumb/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/breadcrumb/)
- Lee la ruta activa y construye breadcrumb con ActivatedRoute

#### [NEW] [toast.component.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/toast/toast.ts)
- Suscribe a ErrorService
- Muestra mensajes de éxito/error con animación slide-in

#### [NEW] [skeleton-loader.component.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/shared/shared/skeleton-loader/skeleton-loader.ts)
- Div gris animado para skeleton loading en listas

---

### FASE 5 — OrdenesModule (Núcleo Operativo)

#### [NEW] [orden.model.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/models/orden.model.ts)
- Interfaces: Orden, LineaOrden, EstadoOrden

#### [NEW] [orden.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/services/orden.service.ts)
- CRUD completo: getAll(filters), getById, create, update, changeStatus, addLinea, removeLinea

#### [NEW] [orden-state.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/services/orden-state.service.ts)
- BehaviorSubject<Orden> para compartir estado entre componentes hijos

#### [MODIFY] [ordenes-list/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/ordenes-list/)
- Barra resumen de estados con conteos
- Tabla con columnas: N°, Cliente/Vehículo, Técnico, Tipo, Estado, Total
- Filtros: estado, técnico, búsqueda libre

#### [MODIFY] [orden-detail/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/orden-detail/)
- Split layout completo como en mockup
- Header oscuro, panel izquierdo (servicios), panel derecho (tabs)
- Totals bar fija en inferior

#### [MODIFY] [orden-form/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/orden-form/)
- ReactiveForm para crear/editar orden

#### [MODIFY] [orden-diagnostico/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/orden-diagnostico/)
- Formulario de diagnóstico del vehículo

#### [MODIFY] [orden-timeline/](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/ordenes/orden-timeline/)
- Timeline visual de cambios de estado

---

### FASE 6 — ClientesModule y VehiculosModule

#### [NEW] [cliente.model.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/clientes/models/cliente.model.ts)
#### [NEW] [cliente.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/clientes/services/cliente.service.ts)
#### [NEW] [vehiculo.model.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/vehiculos/models/vehiculo.model.ts)
#### [NEW] [vehiculo.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/vehiculos/services/vehiculo.service.ts)

Implement all component stubs:
- ClientesListComponent: Tabla con avatar, búsqueda
- ClienteDetailComponent: Tabs (resumen, vehículos, historial, pagos)
- ClienteFormComponent: ReactiveForm
- VehiculosListComponent, VehiculoDetailComponent, VehiculoFormComponent
- VehiculoHistorialComponent

---

### FASE 7 — InventarioModule

#### [NEW] [repuesto.model.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/inventario/models/repuesto.model.ts)
#### [NEW] [inventario.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/inventario/services/inventario.service.ts)

Implement: InventarioListComponent, RepuestoFormComponent, MovimientosComponent, AlertasStockComponent, ProveedoresListComponent

---

### FASE 8 — PagosModule

#### [NEW] [pago.model.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/pagos/models/pago.model.ts)
#### [NEW] [pago.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/pagos/services/pago.service.ts)

Implement: PagosListComponent, PagoFormComponent, FacturaComponent, ResumenFinancieroComponent

---

### FASE 9 — ReportesModule y Dashboard

#### [NEW] [reportes.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/reportes/services/reportes.service.ts)

Implement: DashboardComponent (KPIs + charts), ReporteOrdenesComponent, ReporteIngresosComponent, ReporteMecanicosComponent, ReporteInventarioComponent

> [!NOTE]
> Para las gráficas del Dashboard se usará **Chart.js** con un canvas nativo renderizado desde el component (sin dependencia adicional de ng2-charts, para mantener ligero). Se creará un helper wrapper simple.

---

### FASE 10 — AdminModule

#### [NEW] [admin.service.ts](file:///c:/Users/edwin/OneDrive/Escritorio/Trabajos%20U/Trabajos%20Noveno%20Semestre/Arquitectura/tallerMecanico/src/app/admin/services/admin.service.ts)

Implement: TalleresListComponent, TallerDetailComponent, PlanesComponent, UsosPlataformaComponent

---

## Estrategia de Datos (Sin Backend Real)

Dado que los backends no están conectados aún, cada service tendrá **datos mock** hardcoded que se retornan como `of(data)` con un `delay(300)` para simular latencia. Esto permite:
- Desarrollo completo del frontend sin dependencia del backend
- Testing visual de loading states y skeleton loaders
- Fácil migración a API real (solo cambiar `of()` por `http.get()`)

---

## Archivos Totales Estimados

| Tipo | Cantidad |
|------|----------|
| Servicios nuevos | ~12 |
| Modelos nuevos | ~8 |
| Componentes a implementar | ~45 |
| Route files nuevos | 8 |
| Interceptors (nuevo/modificado) | 2 |
| Guards (nuevo/modificado) | 2 |

---

## Verification Plan

### Automated Tests
```bash
ng serve --configuration=development
```
- Verificar compilación sin errores
- Navegar todas las rutas del routing
- Verificar que el tema se aplica correctamente (CSS custom properties en :root)

### Browser Tests
- Login → Dashboard flow
- Navegación sidebar completa
- OrdenDetail split layout
- Responsive check
- Status badges rendering
- Multi-tenant: verificar con `ng serve --configuration=tallerEdwin` que el branding cambia

### Manual Verification  
- Verificar que todos los componentes renderizan correctamente con datos mock
- Verificar que las CSS custom properties se aplican globalmente
- Verificar lazy loading via Network tab (chunks separados por módulo)
