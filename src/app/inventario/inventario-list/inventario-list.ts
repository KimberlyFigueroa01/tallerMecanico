import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { InventarioService } from '../services/inventario.service';
import { Repuesto } from '../models/repuesto.model';
import { AlertasStock } from '../alertas-stock/alertas-stock';

@Component({
  selector: 'app-inventario-list',
  imports: [AlertasStock],
  templateUrl: './inventario-list.html',
  styleUrl: './inventario-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventarioList {
  private readonly inventarioService = inject(InventarioService);

  readonly repuestos = signal<Repuesto[]>([]);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.inventarioService.getRepuestos().subscribe({
      next: items => {
        this.repuestos.set(items);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  stockClass(repuesto: Repuesto): string {
    if (repuesto.stock < repuesto.minimo) {
      return 'stock-low';
    }
    if (repuesto.stock <= repuesto.minimo + 2) {
      return 'stock-warning';
    }
    return 'stock-ok';
  }
}
