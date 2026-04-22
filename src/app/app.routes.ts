import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './reportes/reportes/dashboard/dashboard';
import { ReporteIngresos } from './reportes/reportes/reporte-ingresos/reporte-ingresos';
import { ReporteInventario } from './reportes/reportes/reporte-inventario/reporte-inventario';
import { ReporteMecanicos } from './reportes/reportes/reporte-mecanicos/reporte-mecanicos';
import { ReporteOrdenes } from './reportes/reportes/reporte-ordenes/reporte-ordenes';

export const routes: Routes = [
  { path: '', component: Login },
  {
    path: 'reportes',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'ingresos', component: ReporteIngresos },
      { path: 'inventario', component: ReporteInventario },
      { path: 'mecanicos', component: ReporteMecanicos },
      { path: 'ordenes', component: ReporteOrdenes },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
