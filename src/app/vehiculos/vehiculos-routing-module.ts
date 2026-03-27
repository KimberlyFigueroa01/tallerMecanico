import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tus componentes (ajusta el nombre de la clase si varía)
import { VehiculosList } from './vehiculos-list/vehiculos-list';
import { VehiculoForm } from './vehiculo-form/vehiculo-form';
import { VehiculoDetail } from './vehiculo-detail/vehiculo-detail';
import { VehiculoHistorial } from './vehiculo-historial/vehiculo-historial';

const routes: Routes = [
  {
    path: '', // Ruta base: /vehiculos
    component: VehiculosList
  },
  {
    path: 'nuevo', // Ruta: /vehiculos/nuevo
    component: VehiculoForm
  },
  {
    path: 'editar/:id', // Ruta: /vehiculos/editar/1
    component: VehiculoForm
  },
  {
    path: 'detalle/:id', // Ruta: /vehiculos/detalle/1
    component: VehiculoDetail
  },
  {
    path: 'historial/:id', // Ruta: /vehiculos/historial/1
    component: VehiculoHistorial
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculosRoutingModule {}