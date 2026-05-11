import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export interface TenantConfig {
  primaryColor: string;
  secondaryColor: string;
  background: string;
  logo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly documentRef = inject(DOCUMENT);

  /** Reactive signal for the tenant logo URL — consumed by navbar, login, etc. */
  readonly logoUrl = signal<string>('assets/logos/logoTallerAndres.png');

  /**
   * Applies a tenant theme at runtime by setting CSS custom properties on :root.
   * Safe for SSR: DOM manipulation is skipped on the server.
   */
  aplicarTema(config: TenantConfig): void {
    this.logoUrl.set(config.logo);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = this.documentRef.documentElement;

    // Variables consumed by Tailwind v4 @theme (--color-primary, --color-bg-custom)
    root.style.setProperty('--app-primary', config.primaryColor);
    root.style.setProperty('--app-bg', config.background);

    // Legacy CSS custom properties used directly in component styles
    root.style.setProperty('--primary-color', config.primaryColor);
    root.style.setProperty('--secondary-color', config.secondaryColor);
    root.style.setProperty('--background-color', config.background);
  }
}
