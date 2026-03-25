import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Planes } from './admin/planes/planes';
import { TallerDetail } from './admin/taller-detail/taller-detail';
import { TalleresList } from './admin/talleres-list/talleres-list';
import { UsosPlataforma } from './admin/usos-plataforma/usos-plataforma';

const routes: Routes = [
  { path: '', component: TalleresList },
  { path: 'talleres/:id', component: TallerDetail },
  { path: 'planes', component: Planes },
  { path: 'usos-plataforma', component: UsosPlataforma },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
