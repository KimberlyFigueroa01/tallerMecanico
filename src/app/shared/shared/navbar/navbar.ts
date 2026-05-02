import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { environment } from '../../../../environments/environment';
import { NotificacionBadge } from '../notificaciones/notificacion-badge/notificacion-badge';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, NotificacionBadge],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {
  readonly theme = environment.theme;
  readonly name = environment.name;
}
