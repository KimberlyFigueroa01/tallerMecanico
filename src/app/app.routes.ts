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
		path: 'ordenes',
		loadChildren: () =>
			import('./ordenes/ordenes-module').then((m) => m.OrdenesModule),
	},
	{
		path: 'shared',
		loadChildren: () =>
			import('./shared/shared-module').then((m) => m.SharedModule),
	},
	{
		path: 'vehiculos',
		loadChildren: () =>
			import('./vehiculos/vehiculos-module').then((m) => m.VehiculosModule),
	},
];
