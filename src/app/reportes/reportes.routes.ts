import { Routes } from '@angular/router';

import { Dashboard } from './reportes/dashboard/dashboard';
import { ReporteIngresos } from './reportes/reporte-ingresos/reporte-ingresos';
import { ReporteInventario } from './reportes/reporte-inventario/reporte-inventario';
import { ReporteMecanicos } from './reportes/reporte-mecanicos/reporte-mecanicos';
import { ReporteOrdenes } from './reportes/reporte-ordenes/reporte-ordenes';

export const REPORTES_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'ordenes',
    component: ReporteOrdenes
  },
  {
    path: 'ingresos',
    component: ReporteIngresos
  },
  {
    path: 'mecanicos',
    component: ReporteMecanicos
  },
  {
    path: 'inventario',
    component: ReporteInventario
  }
];
