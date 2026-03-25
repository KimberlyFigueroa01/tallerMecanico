import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { InventarioList } from './inventario-list/inventario-list';
import { RepuestoForm } from './repuesto-form/repuesto-form';
import { Movimientos } from './movimientos/movimientos';
import { AlertasStock } from './alertas-stock/alertas-stock';
import { ProveedoresList } from './proveedores-list/proveedores-list';

const routes: Routes = [
  { path: '', component: InventarioList },              // Lista principal
  { path: 'nuevo', component: RepuestoForm },           // Crear nuevo repuesto
  { path: ':id', component: RepuestoForm },            // Editar repuesto específico
  { path: 'movimientos', component: Movimientos },      // Historial de entradas/salidas
  { path: 'stock-bajo', component: AlertasStock },      // Panel de alertas
  { path: 'proveedores', component: ProveedoresList },  // Lista de proveedores
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}