import { Routes } from '@angular/router';

import { AlertasStock } from './alertas-stock/alertas-stock';
import { InventarioList } from './inventario-list/inventario-list';
import { Movimientos } from './movimientos/movimientos';
import { ProveedoresList } from './proveedores-list/proveedores-list';
import { RepuestoForm } from './repuesto-form/repuesto-form';

export const INVENTARIO_ROUTES: Routes = [
  {
    path: '',
    component: InventarioList
  },
  {
    path: 'repuesto/nuevo',
    component: RepuestoForm
  },
  {
    path: 'repuesto/:id',
    component: RepuestoForm
  },
  {
    path: 'movimientos',
    component: Movimientos
  },
  {
    path: 'alertas',
    component: AlertasStock
  },
  {
    path: 'proveedores',
    component: ProveedoresList
  }
];
