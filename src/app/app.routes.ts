import { Routes } from '@angular/router';

import { authGuard } from './auth/auth-guard';
import { roleGuard } from './auth/role.guard';
import { MainLayout } from './shared/shared/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./reportes/reportes.routes').then(m => m.REPORTES_ROUTES)
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./clientes/clientes.routes').then(m => m.CLIENTES_ROUTES)
      },
      {
        path: 'vehiculos',
        loadChildren: () =>
          import('./vehiculos/vehiculos.routes').then(m => m.VEHICULOS_ROUTES)
      },
      {
        path: 'ordenes',
        loadChildren: () =>
          import('./ordenes/ordenes.routes').then(m => m.ORDENES_ROUTES)
      },
      {
        path: 'inventario',
        loadChildren: () =>
          import('./inventario/inventario.routes').then(m => m.INVENTARIO_ROUTES)
      },
      {
        path: 'pagos',
        loadChildren: () =>
          import('./pagos/pagos.routes').then(m => m.PAGOS_ROUTES)
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./reportes/reportes.routes').then(m => m.REPORTES_ROUTES)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [roleGuard],
        data: { roles: ['SUPERADMIN'] }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
