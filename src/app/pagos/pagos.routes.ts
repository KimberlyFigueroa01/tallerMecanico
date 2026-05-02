import { Routes } from '@angular/router';

import { Factura } from './pagos/factura/factura';
import { PagoForm } from './pagos/pago-form/pago-form';
import { PagosList } from './pagos/pagos-list/pagos-list';
import { ResumenFinanciero } from './pagos/resumen-financiero/resumen-financiero';

export const PAGOS_ROUTES: Routes = [
  {
    path: '',
    component: PagosList
  },
  {
    path: ':id',
    component: PagoForm
  },
  {
    path: ':ordenId/factura',
    component: Factura
  },
  {
    path: 'resumen',
    component: ResumenFinanciero
  }
];
