import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './reportes/dashboard/dashboard';
import { ReporteIngresos } from './reportes/reporte-ingresos/reporte-ingresos';
import { ReporteInventario } from './reportes/reporte-inventario/reporte-inventario';
import { ReporteMecanicos } from './reportes/reporte-mecanicos/reporte-mecanicos';
import { ReporteOrdenes } from './reportes/reporte-ordenes/reporte-ordenes';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'ingresos', component: ReporteIngresos },
  { path: 'inventario', component: ReporteInventario },
  { path: 'mecanicos', component: ReporteMecanicos },
  { path: 'ordenes', component: ReporteOrdenes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
