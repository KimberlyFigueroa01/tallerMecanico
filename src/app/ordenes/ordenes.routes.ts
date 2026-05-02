import { Routes } from '@angular/router';

import { OrdenDetail } from './orden-detail/orden-detail';
import { OrdenDiagnostico } from './orden-diagnostico/orden-diagnostico';
import { OrdenForm } from './orden-form/orden-form';
import { OrdenesList } from './ordenes-list/ordenes-list';

export const ORDENES_ROUTES: Routes = [
  {
    path: '',
    component: OrdenesList
  },
  {
    path: 'nueva',
    component: OrdenForm
  },
  {
    path: ':id',
    component: OrdenDetail
  },
  {
    path: ':id/editar',
    component: OrdenForm
  },
  {
    path: ':id/diagnostico',
    component: OrdenDiagnostico
  }
];
