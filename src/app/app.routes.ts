import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'admin',
		loadChildren: () =>
			import('./admin/admin-module').then((m) => m.AdminModule),
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
	},
	{
		path: 'clientes',
		loadChildren: () =>
			import('./clientes/clientes-module').then((m) => m.ClientesModule),
	},
	{
		path: 'inventario',
		loadChildren: () =>
			import('./inventario/inventario-module').then((m) => m.InventarioModule),
	},
	{
		path: 'pagos',
		loadChildren: () =>
			import('./pagos/pagos-module').then((m) => m.PagosModule),
	},
	{
		path: 'reportes',
		loadChildren: () =>
			import('./reportes/reportes-module').then((m) => m.ReportesModule),
	},
	
];
