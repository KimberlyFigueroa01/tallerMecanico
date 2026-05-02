import { Routes } from '@angular/router';

import { VehiculoDetail } from './vehiculo-detail/vehiculo-detail';
import { VehiculoForm } from './vehiculo-form/vehiculo-form';
import { VehiculoHistorial } from './vehiculo-historial/vehiculo-historial';
import { VehiculosList } from './vehiculos-list/vehiculos-list';

export const VEHICULOS_ROUTES: Routes = [
  {
    path: '',
    component: VehiculosList
  },
  {
    path: 'nuevo',
    component: VehiculoForm
  },
  {
    path: ':id',
    component: VehiculoDetail
  },
  {
    path: ':id/editar',
    component: VehiculoForm
  },
  {
    path: ':id/historial',
    component: VehiculoHistorial
  }
];
