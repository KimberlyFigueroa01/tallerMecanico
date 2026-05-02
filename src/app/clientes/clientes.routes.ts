import { Routes } from '@angular/router';

import { ClienteDetail } from './cliente-detail/cliente-detail';
import { ClienteForm } from './cliente-form/cliente-form';
import { ClientesList } from './clientes-list/clientes-list';

export const CLIENTES_ROUTES: Routes = [
  {
    path: '',
    component: ClientesList
  },
  {
    path: 'nuevo',
    component: ClienteForm
  },
  {
    path: ':id',
    component: ClienteDetail
  },
  {
    path: ':id/editar',
    component: ClienteForm
  }
];
