import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagosList } from './pagos-list/pagos-list';
import { PagoForm } from './pago-form/pago-form';
import { Factura } from './factura/factura';
import { ResumenFinanciero } from './resumen-financiero/resumen-financiero';

const routes: Routes = [
  { path: '', component: PagosList },                // /pagos
  { path: 'nuevo', component: PagoForm },             // /pagos/nuevo
  { path: ':id', component: PagoForm },              // /pagos/editar-pago (por ID)
  { path: 'factura/:id', component: Factura },        // /pagos/factura/123
  { path: 'resumen', component: ResumenFinanciero }   // /pagos/resumen
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosRoutingModule {}