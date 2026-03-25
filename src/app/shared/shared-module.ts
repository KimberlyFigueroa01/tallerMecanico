import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionBadge } from './shared/notificaciones/notificacion-badge/notificacion-badge';
import { NotificacionConfig } from './shared/notificaciones/notificacion-config/notificacion-config';
import { NotificacionForm } from './shared/notificaciones/notificacion-form/notificacion-form';
import { NotificacionesList } from './shared/notificaciones/notificaciones-list/notificaciones-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificacionBadge,
    NotificacionConfig,
    NotificacionForm,
    NotificacionesList,
  ],
  exports: [
    NotificacionBadge,
    NotificacionConfig,
    NotificacionForm,
    NotificacionesList,
  ],
})
export class SharedModule {}
