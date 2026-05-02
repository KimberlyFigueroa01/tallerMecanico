import { Routes } from '@angular/router';

import { ForgotPassword } from './forgot-password/forgot-password';
import { Login } from './login/login';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'forgot',
    component: ForgotPassword
  }
];
