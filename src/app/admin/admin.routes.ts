import { Routes } from '@angular/router';

import { Planes } from './admin/planes/planes';
import { TallerDetail } from './admin/taller-detail/taller-detail';
import { TalleresList } from './admin/talleres-list/talleres-list';
import { UsosPlataforma } from './admin/usos-plataforma/usos-plataforma';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: TalleresList
  },
  {
    path: ':id',
    component: TallerDetail
  },
  {
    path: 'planes',
    component: Planes
  },
  {
    path: 'uso',
    component: UsosPlataforma
  }
];
