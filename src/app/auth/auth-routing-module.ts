import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Login } from './login/login';
import { RegisterTaller } from './register-taller/register-taller';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'registro-taller', component: RegisterTaller },
  { path: 'forgot-password', component: ForgotPassword },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
