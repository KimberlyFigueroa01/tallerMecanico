import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenesList } from './ordenes-list/ordenes-list';
import { OrdenDetail } from './orden-detail/orden-detail';
import { OrdenForm } from './orden-form/orden-form';
import { OrdenDiagnostico } from './orden-diagnostico/orden-diagnostico';
import { OrdenRepuestos } from './orden-repuestos/orden-repuestos';
import { OrdenTrabajo } from './orden-trabajo/orden-trabajo';
import { OrdenTimeline } from './orden-timeline/orden-timeline';

const routes: Routes = [
  {
    path: '',
    component: OrdenesList,
  },
  {
    path: 'new',
    component: OrdenForm,
  },
  {
    path: ':id',
    component: OrdenDetail,
  },
  {
    path: ':id/diagnostico',
    component: OrdenDiagnostico,
  },
  {
    path: ':id/repuestos',
    component: OrdenRepuestos,
  },
  {
    path: ':id/trabajo',
    component: OrdenTrabajo,
  },
  {
    path: ':id/timeline',
    component: OrdenTimeline,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenesRoutingModule {}
