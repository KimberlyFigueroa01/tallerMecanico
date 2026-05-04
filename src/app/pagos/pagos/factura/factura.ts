import { ChangeDetectionStrategy, Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { DatePipe, DecimalPipe, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { OrdenService } from '../../../ordenes/services/orden.service';
import { Orden } from '../../../ordenes/models/orden.model';

@Component({
  selector: 'app-factura',
  imports: [DatePipe, DecimalPipe, NgOptimizedImage],
  templateUrl: './factura.html',
  styleUrl: './factura.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Factura {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly ordenService = inject(OrdenService);

  readonly taller = environment.name;
  readonly theme = environment.theme;
  readonly orden = signal<Orden | null>(null);

  readonly totals = computed(() => {
    const orden = this.orden();
    if (!orden) {
      return { subtotal: 0, descuento: 0, iva: 0, total: 0 };
    }
    const subtotal = orden.lineas.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );
    const descuento = orden.lineas.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad * (item.descuentoPct / 100),
      0
    );
    const neto = subtotal - descuento;
    const iva = neto * 0.19;
    const total = neto + iva;
    return { subtotal, descuento, iva, total };
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('ordenId');
    if (!idParam) {
      return;
    }
    const ordenId = Number(idParam);
    this.ordenService.getById(ordenId).subscribe(orden => this.orden.set(orden));
  }

  print(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }
}
