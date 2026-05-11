import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { environment } from '../../../../environments/environment';
import { ConfiguracionService } from '../../services/configuracion.service';
import { NotificacionBadge } from '../notificaciones/notificacion-badge/notificacion-badge';

@Component({
  selector: 'app-navbar',
  imports: [NgOptimizedImage, NotificacionBadge],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {
  private readonly configService = inject(ConfiguracionService);
  
  readonly logoUrl = this.configService.logoUrl;
  readonly name = environment.name;
}
