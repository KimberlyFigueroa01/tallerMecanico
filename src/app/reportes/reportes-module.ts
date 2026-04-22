import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing-module';
import { Dashboard } from './reportes/dashboard/dashboard';
import { ReporteIngresos } from './reportes/reporte-ingresos/reporte-ingresos';
import { ReporteInventario } from './reportes/reporte-inventario/reporte-inventario';
import { ReporteMecanicos } from './reportes/reporte-mecanicos/reporte-mecanicos';
import { ReporteOrdenes } from './reportes/reporte-ordenes/reporte-ordenes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    Dashboard,
    ReporteIngresos,
    ReporteInventario,
    ReporteMecanicos,
    ReporteOrdenes,
  ],
})
export class ReportesModule {}
