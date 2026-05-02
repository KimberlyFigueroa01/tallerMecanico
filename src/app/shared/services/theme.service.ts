import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly documentRef = inject(DOCUMENT);

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = this.documentRef.documentElement;
    const { theme } = environment;

    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--background-color', theme.background);
  }
}
