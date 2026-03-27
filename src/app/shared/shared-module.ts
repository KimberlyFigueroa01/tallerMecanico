import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing-module';
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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    Navbar,
    Sidebar,
    Breadcrumb,
    Table,
    Modal,
    StatusBadge,
    EmptyState,
    ConfirmDialog,
    Avatar,
    NotificacionBadge,
    NotificacionConfig,
    NotificacionForm,
    NotificacionesList,
  ],
  exports: [
    ConfirmDialog,
    Avatar,
    NotificacionBadge,
    NotificacionConfig,
    NotificacionForm,
    NotificacionesList,
  ],
})
export class SharedModule {}
