import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetail } from './cliente-detail/cliente-detail';
import { ClienteForm } from './cliente-form/cliente-form';
import { ClienteHistorial } from './cliente-historial/cliente-historial';
import { ClienteVehiculos } from './cliente-vehiculos/cliente-vehiculos';
import { ClientesList } from './clientes-list/clientes-list';

const routes: Routes = [
  { path: '', component: ClientesList },
  { path: 'crear', component: ClienteForm },
  { path: ':id', component: ClienteDetail },
  { path: ':id/historial', component: ClienteHistorial },
  { path: ':id/vehiculos', component: ClienteVehiculos },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
