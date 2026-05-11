import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly configuracionService = inject(ConfiguracionService);

  /**
   * Initializes the default theme from the environment configuration.
   * Called once on app bootstrap. Components can later call
   * ConfiguracionService.aplicarTema() to switch tenants at runtime.
   */
  init(): void {
    this.configuracionService.aplicarTema(environment.theme);
  }
}
