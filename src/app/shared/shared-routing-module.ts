// filepath: shared/shared-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Sidebar } from './shared/sidebar/sidebar';
import { Breadcrumb } from './shared/breadcrumb/breadcrumb';
import { Table } from './shared/table/table';
import { Modal } from './shared/modal/modal';
import { StatusBadge } from './shared/status-badge/status-badge';
import { EmptyState } from './shared/empty-state/empty-state';
import { ConfirmDialog } from './shared/confirm-dialog/confirm-dialog';
import { Avatar } from './shared/avatar/avatar';
import { NotificacionBadge } from './shared/notificaciones/notificacion-badge/notificacion-badge';
import { NotificacionConfig } from './shared/notificaciones/notificacion-config/notificacion-config';
import { NotificacionForm } from './shared/notificaciones/notificacion-form/notificacion-form';
import { NotificacionesList } from './shared/notificaciones/notificaciones-list/notificaciones-list';

const routes: Routes = [
  {
    path: 'navbar',
    component: Navbar
  },
  {
    path: 'sidebar',
    component: Sidebar
  },
  {
    path: 'breadcrumb',
    component: Breadcrumb
  },
  {
    path: 'table',
    component: Table
  },
  {
    path: 'modal',
    component: Modal
  },
  {
    path: 'status-badge',
    component: StatusBadge
  },
  {
    path: 'empty-state',
    component: EmptyState
  },
  {
    path: 'confirm-dialog',
    component: ConfirmDialog
  },
  {
    path: 'avatar',
    component: Avatar
  },
  {
    path: 'notificacion-badge',
    component: NotificacionBadge
  },
  {
    path: 'notificacion-config',
    component: NotificacionConfig
  },
  {
    path: 'notificacion-form',
    component: NotificacionForm
  },
  {
    path: 'notificaciones-list',
    component: NotificacionesList
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }