# Taller Mecánico - Sistema de Gestión

Sistema integral de gestión para talleres mecánicos desarrollado en Angular con arquitectura modular. El sistema permite administrar clientes, vehículos, órdenes de trabajo, inventario, pagos y reportes.

## 📋 Estructura de Interfases

### 🔐 **Módulo de Autenticación (Auth Module)**

#### 1. **Login**
- **Propósito**: Acceso al sistema
- **Elementos principales**:
  - Logo/Branding del taller en la parte superior
  - Campo de email/usuario
  - Campo de contraseña
  - Botón "Iniciar Sesión"
  - Link "¿Olvidaste tu contraseña?"
  - Link "Registrar nuevo taller"
  - Diseño centrado, fondo corporativo
  - Validaciones en tiempo real

#### 2. **Register Taller**
- **Propósito**: Registro de nuevos talleres en el sistema
- **Elementos principales**:
  - Nombre del taller
  - Email corporativo
  - Teléfono
  - Dirección
  - Ciudad/Departamento
  - Contraseña (con requisitos mostrados)
  - Confirmación de contraseña
  - Términos y condiciones (checkbox)
  - Botón "Registrarse"
  - Link "Volver al login"

#### 3. **Forgot Password**
- **Propósito**: Recuperación de contraseña
- **Elementos principales**:
  - Campo de email
  - Mensaje informativo
  - Botón "Enviar enlace de recuperación"
  - Mensaje de confirmación
  - Link "Volver al login"

---

### 👨‍💼 **Módulo de Admin**

#### 4. **Talleres List**
- **Propósito**: Visualizar todos los talleres registrados (solo admin)
- **Elementos principales**:
  - Tabla con columnas: Nombre, Email, Teléfono, Ciudad, Fecha Registro, Estado
  - Barra de búsqueda/filtros
  - Paginación
  - Botón "Ver Detalles"
  - Botón "Editar"
  - Botón "Eliminar" (con confirmación)

#### 5. **Taller Detail**
- **Propósito**: Ver detalles de un taller específico
- **Elementos principales**:
  - Información general del taller (nombre, email, teléfono, dirección)
  - Estadísticas: Total de clientes, órdenes activas, ingresos mensuales
  - Historial de actividades recientes
  - Botón "Editar"
  - Botón "Volver a lista"

#### 6. **Planes**
- **Propósito**: Administrar planes de suscripción
- **Elementos principales**:
  - Tabla/Cards con planes disponibles: Básico, Profesional, Empresarial
  - Para cada plan: Nombre, Precio, Características, Usuarios incluidos
  - Botón "Editar Plan"
  - Botón "Crear nuevo plan"
  - Opciones de facturación (mensual/anual)

#### 7. **Usos Plataforma**
- **Propósito**: Reportes de uso de la plataforma
- **Elementos principales**:
  - Gráficos de: Usuarios activos por mes, Órdenes procesadas, Talleres activos
  - Tabla de estadísticas generales
  - Filtros por rango de fechas
  - Exportar reportes (PDF/Excel)

---

### 👥 **Módulo de Clientes (Clientes Module)**

#### 8. **Clientes List**
- **Propósito**: Listar todos los clientes del taller
- **Elementos principales**:
  - Tabla con columnas: Nombre, Teléfono, Email, Vehículos (cantidad), Última visita, Deuda
  - Barra de búsqueda/filtros (por nombre, teléfono, estado)
  - Paginación
  - Botón "Nuevo Cliente"
  - Botón "Ver Detalles" por cliente
  - Indicador visual de deuda pendiente

#### 9. **Cliente Form**
- **Propósito**: Crear o editar cliente
- **Elementos principales**:
  - Campos: Nombre completo, Teléfono, Email, Cédula/ID, Dirección, Ciudad
  - Foto del cliente (upload opcional)
  - Datos de contacto adicional
  - Botón "Guardar"
  - Botón "Cancelar"
  - Validaciones de campos requeridos

#### 10. **Cliente Detail**
- **Propósito**: Ver información completa de un cliente
- **Elementos principales**:
  - Información personal (foto, nombre, contacto)
  - Resumen de órdenes recientes
  - Total gastado en el taller
  - Deuda pendiente
  - Últimos servicios realizados
  - Botón "Editar"
  - Botón "Nueva Orden"
  - Botón "Volver"

#### 11. **Cliente Historial**
- **Propósito**: Ver histórico de órdenes de un cliente
- **Elementos principales**:
  - Timeline o tabla con todas las órdenes históricas
  - Columnas: Fecha, Vehículo, Servicio, Valor, Estado
  - Filtros por rango de fecha, estado, valor
  - Búsqueda
  - Opción de descargar historial

#### 12. **Cliente Vehículos**
- **Propósito**: Gestionar vehículos asociados a un cliente
- **Elementos principales**:
  - Cards/Tabla de vehículos del cliente
  - Para cada vehículo: Placa, Marca, Modelo, Año, Kilometraje
  - Botón "Agregar vehículo"
  - Botón "Ver detalles vehículo"
  - Botón "Editar vehículo"
  - Botón "Historial de servicios"

---

### 🚗 **Módulo de Vehículos (Vehiculos Module)**

#### 13. **Vehículos List**
- **Propósito**: Listar todos los vehículos en el sistema
- **Elementos principales**:
  - Tabla con columnas: Placa, Marca, Modelo, Año, Propietario, Último servicio, Estado
  - Filtros: Por marca, modelo, año, estado
  - Búsqueda por placa
  - Paginación
  - Botón "Nuevo vehículo"
  - Botón "Ver detalles"

#### 14. **Vehiculo Form**
- **Propósito**: Crear o editar vehículo
- **Elementos principales**:
  - Campos: Placa (con validación), Marca, Modelo, Año, Color
  - VIN (número de chasis)
  - Cilindrada, Tipo de combustible
  - Propietario (select de clientes)
  - Foto del vehículo (upload)
  - Botón "Guardar"
  - Botón "Cancelar"

#### 15. **Vehiculo Detail**
- **Propósito**: Ver información completa de un vehículo
- **Elementos principales**:
  - Foto e información general
  - Datos técnicos (marca, modelo, año, VIN, cilindrada)
  - Propietario
  - Historial de servicios
  - Próximo mantenimiento recomendado
  - Botón "Editar"
  - Botón "Nueva orden para este vehículo"
  - Botón "Volver"

#### 16. **Vehiculo Historial**
- **Propósito**: Ver historial de servicios de un vehículo
- **Elementos principales**:
  - Timeline de servicios realizados
  - Columnas: Fecha, Tipo de servicio, Valor, Técnico, Estado
  - Filtros por tipo de servicio, rango de fecha
  - Búsqueda
  - Opción de descargar historial

---

### 📋 **Módulo de Órdenes (Ordenes Module)**

#### 17. **Órdenes List**
- **Propósito**: Listar todas las órdenes de trabajo
- **Elementos principales**:
  - Tabla con columnas: #Orden, Cliente, Vehículo, Fecha, Estado, Valor total, Técnico asignado
  - Filtros: Por estado (pendiente, en proceso, completada), rango de fecha
  - Búsqueda por número de orden o cliente
  - Paginación
  - Botón "Nueva orden"
  - Botón "Ver detalles"
  - Indicadores visuales por estado

#### 18. **Orden Form**
- **Propósito**: Crear o editar orden de trabajo
- **Elementos principales**:
  - Select de cliente
  - Select de vehículo (filtrado por cliente)
  - Descripción del problema
  - Presupuesto estimado
  - Fecha de ingreso (auto-completado)
  - Técnico asignado (select)
  - Prioridad (Normal, Urgente, Baja)
  - Botón "Guardar"
  - Botón "Cancelar"

#### 19. **Orden Detail**
- **Propósito**: Ver detalles completos de una orden
- **Elementos principales**:
  - Información general (número, cliente, vehículo, fecha)
  - Estado actual (visual con progreso)
  - Descripción del problema
  - Repuestos utilizados
  - Tiempo de trabajo
  - Valor total
  - Notas técnicas
  - Botón "Editar"
  - Botón "Cambiar estado"
  - Botón "Ver timeline"

#### 20. **Orden Timeline**
- **Propósito**: Ver progreso de la orden en tiempo real
- **Elementos principales**:
  - Timeline vertical mostrando: Recibida, Diagnóstico, En trabajo, Pruebas, Completada
  - Timestamp de cada etapa
  - Técnico responsable de cada etapa
  - Notas por etapa
  - Botón "Actualizar estado"

#### 21. **Orden Diagnostico**
- **Propósito**: Registro del diagnóstico inicial
- **Elementos principales**:
  - Descripción detallada del problema
  - Checklist de elementos revisados
  - Foto/evidencias del problema
  - Recomendaciones iniciales
  - Presupuesto estimado
  - Botón "Guardar diagnóstico"
  - Botón "Proceder a reparación"

#### 22. **Orden Repuestos**
- **Propósito**: Gestionar repuestos utilizados en la orden
- **Elementos principales**:
  - Tabla de repuestos: Nombre, Código, Cantidad, Precio unitario, Total
  - Botón "Agregar repuesto" (con búsqueda en inventario)
  - Botón "Eliminar repuesto"
  - Total de repuestos
  - Actualización automática del valor total de la orden
  - Botón "Guardar cambios"

#### 23. **Orden Trabajo**
- **Propósito**: Registrar actividades de trabajo en la orden
- **Elementos principales**:
  - Tabla de trabajos realizados: Descripción, Técnico, Horas, Tarifa, Total
  - Botón "Agregar trabajo"
  - Botón "Eliminar trabajo"
  - Total de horas trabajadas
  - Total mano de obra
  - Botón "Guardar cambios"

---

### 📦 **Módulo de Inventario (Inventario Module)**

#### 24. **Inventario List**
- **Propósito**: Listar todos los repuestos en inventario
- **Elementos principales**:
  - Tabla con columnas: Código, Nombre, Categoría, Stock, Stock mínimo, Valor unitario, Proveedor
  - Filtros: Por categoría, proveedor, estado de stock
  - Búsqueda por nombre o código
  - Paginación
  - Botón "Nuevo repuesto"
  - Botón "Ver detalles"
  - Indicador visual de bajo stock (rojo si stock < mínimo)

#### 25. **Repuesto Form**
- **Propósito**: Crear o editar repuesto
- **Elementos principales**:
  - Código del repuesto (auto-generado o manual)
  - Nombre
  - Categoría (select)
  - Descripción
  - Stock actual
  - Stock mínimo
  - Precio de compra
  - Precio de venta
  - Proveedor (select)
  - Foto del repuesto (upload)
  - Botón "Guardar"
  - Botón "Cancelar"

#### 26. **Alertas Stock**
- **Propósito**: Alertas de inventario bajo
- **Elementos principales**:
  - Tabla/Cards de repuestos con stock bajo
  - Columnas: Código, Nombre, Stock actual, Stock mínimo, Diferencia
  - Botón "Ordenar al proveedor"
  - Link a formulario de orden
  - Botón "Descartar alerta"
  - Filtros por categoría, proveedor

#### 27. **Movimientos**
- **Propósito**: Historial de movimientos de inventario
- **Elementos principales**:
  - Tabla con columnas: Fecha, Tipo (entrada/salida), Repuesto, Cantidad, Razón, Usuario
  - Filtros: Por tipo, rango de fecha, repuesto
  - Búsqueda
  - Gráfico de movimientos por mes
  - Botón "Registrar entrada"
  - Botón "Registrar salida"

#### 28. **Proveedores List**
- **Propósito**: Gestionar proveedores de repuestos
- **Elementos principales**:
  - Tabla con columnas: Nombre, Teléfono, Email, Dirección, Activo
  - Búsqueda
  - Botón "Nuevo proveedor"
  - Botón "Ver detalles"
  - Botón "Editar"
  - Botón "Eliminar"

---

### 💰 **Módulo de Pagos (Pagos Module)**

#### 29. **Pagos**
- **Propósito**: Registro y gestión de pagos de órdenes
- **Elementos principales**:
  - Tabla de pagos: Número de orden, Cliente, Fecha, Valor, Método de pago, Estado
  - Filtros: Por estado (pagado, pendiente, parcial), rango de fecha, método de pago
  - Búsqueda por número de orden o cliente
  - Paginación
  - Botón "Registrar pago"
  - Botón "Ver detalles"
  - Botón "Imprimir recibo"
  - Gráfico de ingresos por período

#### 30. **Formulario de Registro de Pago**
- **Propósito**: Registrar un nuevo pago
- **Elementos principales**:
  - Select de orden (con valor pendiente mostrado)
  - Valor a pagar
  - Fecha del pago
  - Método de pago (efectivo, tarjeta, transferencia, cheque)
  - Número de transacción (si aplica)
  - Observaciones
  - Botón "Guardar pago"
  - Opción de generar recibo

---

### 📊 **Módulo de Reportes (Reportes Module)**

#### 31. **Reportes**
- **Propósito**: Reportes analíticos del taller
- **Elementos principales**:
  - Dashboard con gráficos:
    - Órdenes completadas por mes
    - Ingresos por mes
    - Clientes nuevos por mes
    - Top 5 repuestos más utilizados
    - Técnicos más productivos
  - Tabla de resumen de datos
  - Filtros: Por rango de fecha, técnico, cliente
  - Opciones de exportar (PDF, Excel)
  - Botón "Descargar reporte"

---

### 🎨 **Módulo Compartido (Shared Module)**

#### Componentes comunes a todas las interfaces:
- **Header/Navbar**: Logo, menú de navegación, usuario logged, cerrar sesión
- **Sidebar**: Menú lateral con opciones de cada módulo, indicador de módulo activo
- **Footer**: Información del pie de página
- **Modal de confirmación**: Para acciones críticas (eliminar, cambiar estado)
- **Notificaciones/Toast**: Mensajes de éxito, error, warning
- **Tabla genérica**: Componente reutilizable para todas las listas
- **Formulario genérico**: Componente reutilizable para crear/editar
- **Paginación**: Componente reutilizable
- **Búsqueda/Filtros**: Componente compartido

---

## 🎯 Estilos y Diseño General

- **Paleta de colores**: Azul corporativo (primario), gris (secundario), verde (éxito), rojo (alerta)
- **Tipografía**: Fuente moderna y legible (ej: Inter, Roboto)
- **Diseño responsivo**: Adaptable a dispositivos móviles, tablets y desktop
- **Iconografía**: Usar iconos consistentes en toda la aplicación
- **Espaciado**: Consistente con espacios definidos (8px, 16px, 24px, etc.)
- **Sombras**: Sutiles para dar profundidad a elementos interactivos
- **Estados**: Indicadores visuales claros para estados de componentes

---

## 🚀 Guía de Despliegue

### 📋 Pre-requisitos para Despliegue

Antes de desplegar, asegúrate de que:
- ✅ El proyecto compile sin errores (`npm run build`)
- ✅ Las pruebas pasan (`npm test`)
- ✅ Las variables de entorno están configuradas
- ✅ La base de datos está configurada y accesible
- ✅ Los servicios backend están desplegados y accesibles

### 🏗️ Construcción de Producción

```bash
# Instalar dependencias
npm install

# Ejecutar pruebas
npm test -- --watch=false

# Construir para producción
npm run build
```

### 🌐 Opciones de Despliegue

#### **Opción 1: Despliegue Estático (Recomendado para SSR)**

##### **Railway** (Recomendado)
Railway es ideal para aplicaciones Angular con SSR ya que soporta Node.js.

1. **Crear cuenta en Railway**: https://railway.app
2. **Conectar repositorio GitHub**
3. **Configurar variables de entorno**:
   ```
   NODE_ENV=production
   PORT=8080
   API_URL=https://tu-api-backend.com
   ```
4. **Railway detectará automáticamente** el proyecto Angular con SSR
5. **URL de despliegue**: Se genera automáticamente

##### **Render**
1. **Crear cuenta en Render**: https://render.com
2. **Conectar repositorio GitHub**
3. **Seleccionar "Web Service"**
4. **Configurar build settings**:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run serve:ssr:tallerMecanico`
5. **Variables de entorno**: Configurar API_URL y otras necesarias
6. **Despliegue automático** en cada push

##### **Vercel**
Para SSR en Vercel, necesitas adaptar la configuración:

1. **Instalar Vercel CLI**: `npm i -g vercel`
2. **Crear `vercel.json`**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "dist/tallerMecanico/server/server.mjs",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "dist/tallerMecanico/server/server.mjs"
       }
     ]
   }
   ```
3. **Desplegar**: `vercel --prod`

#### **Opción 2: Contenedorización con Docker**

##### **Crear Dockerfile**
```dockerfile
# Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS production

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

RUN npm ci --only=production

EXPOSE 4000
CMD ["npm", "run", "serve:ssr:tallerMecanico"]
```

##### **Crear docker-compose.yml** (opcional)
```yaml
version: '3.8'
services:
  taller-mecanico:
    build: .
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - API_URL=https://tu-api-backend.com
    restart: unless-stopped
```

##### **Desplegar con Docker**
```bash
# Construir imagen
docker build -t taller-mecanico .

# Ejecutar contenedor
docker run -p 4000:4000 -e API_URL=https://tu-api-backend.com taller-mecanico

# O con docker-compose
docker-compose up -d
```

##### **Plataformas que soportan Docker**:
- **Google Cloud Run**
- **AWS Fargate**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Railway** (soporta Dockerfiles)

#### **Opción 3: Despliegue en Azure**

##### **Azure Static Web Apps** (para SPA sin SSR)
```bash
# Instalar Azure CLI
npm install -g @azure/static-web-apps-cli

# Login
az login

# Crear Static Web App
az staticwebapp create \
  --name taller-mecanico \
  --resource-group myResourceGroup \
  --source https://github.com/username/repo \
  --location "Central US" \
  --branch main \
  --app-location "/" \
  --output-location "dist/tallerMecanico/browser" \
  --login-with-github
```

##### **Azure App Service** (recomendado para SSR)
1. **Crear App Service** en Azure Portal
2. **Configurar deployment** desde GitHub
3. **Startup Command**: `npm run serve:ssr:tallerMecanico`
4. **Variables de entorno** en Application Settings

#### **Opción 4: Despliegue en VPS/Servidor Dedicado**

##### **Configuración del Servidor**
```bash
# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 para gestión de procesos
sudo npm install -g pm2

# Clonar repositorio
git clone https://github.com/username/taller-mecanico.git
cd taller-mecanico

# Instalar dependencias
npm install

# Construir aplicación
npm run build

# Configurar PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

##### **Archivo ecosystem.config.js**
```javascript
module.exports = {
  apps: [{
    name: 'taller-mecanico',
    script: 'dist/tallerMecanico/server/server.mjs',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

##### **Configurar Nginx (Reverse Proxy)**
```nginx
# /etc/nginx/sites-available/taller-mecanico
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 🔧 Configuración de Variables de Entorno

Crear archivo `.env` o configurar en la plataforma:

```env
# Entorno
NODE_ENV=production

# Puerto del servidor
PORT=4000

# URL de la API backend
API_URL=https://api-taller-mecanico.com

# Base de datos (si aplica)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taller_mecanico
DB_USER=usuario
DB_PASSWORD=contraseña

# JWT Secret
JWT_SECRET=tu_jwt_secret_seguro

# Configuración de email (opcional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
```

### 📊 Monitoreo y Mantenimiento

#### **Configurar Logging**
```javascript
// En src/server.ts agregar:
import { Logger } from '@nestjs/common';

const logger = new Logger('SSR');

app.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});
```

#### **Health Check Endpoint**
```typescript
// En app.routes.ts
{
  path: 'health',
  component: HealthCheckComponent
}
```

#### **Monitoreo con PM2**
```bash
# Ver logs
pm2 logs taller-mecanico

# Ver métricas
pm2 monit

# Reiniciar aplicación
pm2 restart taller-mecanico

# Ver estado
pm2 status
```

### 🔒 Seguridad en Producción

- ✅ **HTTPS obligatorio** (Let's Encrypt o certificado SSL)
- ✅ **Variables de entorno** para secrets (nunca en código)
- ✅ **Helmet.js** para headers de seguridad
- ✅ **Rate limiting** para prevenir ataques
- ✅ **CORS** configurado correctamente
- ✅ **Validación de entrada** en todos los formularios
- ✅ **Autenticación robusta** (JWT con expiración)

### 📈 Optimización de Rendimiento

- ✅ **Lazy loading** de módulos implementado
- ✅ **Service Worker** para PWA (opcional)
- ✅ **CDN** para assets estáticos
- ✅ **Compresión Gzip/Brotli**
- ✅ **Cache headers** apropiados
- ✅ **Bundle analyzer** para optimizar tamaño

### 🚀 CI/CD Pipeline Recomendado

#### **GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --watch=false

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Railway
        run: |
          curl -fsSL https://railway.app/install.sh | bash
          railway deploy --detach
```

### 🎯 Checklist Final de Despliegue

- [ ] **Build exitoso** sin errores
- [ ] **Pruebas pasan** completamente
- [ ] **Variables de entorno** configuradas
- [ ] **Backend API** desplegado y accesible
- [ ] **Base de datos** configurada y con datos iniciales
- [ ] **Dominio SSL** configurado
- [ ] **Monitoreo** establecido
- [ ] **Backups** automáticos configurados
- [ ] **Documentación** de API actualizada
- [ ] **Equipo notificado** del despliegue

### 📞 Soporte Post-Despliegue

- **Monitorear logs** regularmente
- **Configurar alertas** para errores críticos
- **Tener plan de rollback** preparado
- **Documentar incidentes** y soluciones
- **Actualizaciones regulares** de dependencias

---

## 📝 Notas Adicionales

- La aplicación utiliza **Angular SSR** (Server-Side Rendering) para mejor SEO y rendimiento inicial
- Se recomienda **Railway** o **Render** para despliegues simples y rápidos
- Para entornos enterprise, considera **Azure App Service** o **AWS Elastic Beanstalk**
- Mantén actualizadas las dependencias de seguridad regularmente
- Implementa monitoreo desde el día cero del despliegue