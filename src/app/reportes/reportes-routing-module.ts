import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { ReporteOrdenes } from './reporte-ordenes/reporte-ordenes';
import { ReporteIngresos } from './reporte-ingresos/reporte-ingresos';
import { ReporteMecanicos } from './reporte-mecanicos/reporte-mecanicos';
import { ReporteInventario } from './reporte-inventario/reporte-inventario';

const routes: Routes = [
  { path: '', component: Dashboard },                // taller.com/reportes
  { path: 'ordenes', component: ReporteOrdenes },     // taller.com/reportes/ordenes
  { path: 'ingresos', component: ReporteIngresos },   // taller.com/reportes/ingresos
  { path: 'mecanicos', component: ReporteMecanicos }, // taller.com/reportes/mecanicos
  { path: 'inventario', component: ReporteInventario } // taller.com/reportes/inventario
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}