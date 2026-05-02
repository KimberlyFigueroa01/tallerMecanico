import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-factura',
  imports: [],
  templateUrl: './factura.html',
  styleUrl: './factura.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Factura {
  private readonly platformId = inject(PLATFORM_ID);
  readonly taller = environment.name;
  readonly theme = environment.theme;

  print(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }
}
