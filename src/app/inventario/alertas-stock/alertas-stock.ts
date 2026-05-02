import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { InventarioService } from '../services/inventario.service';
import { Repuesto } from '../models/repuesto.model';

@Component({
  selector: 'app-alertas-stock',
  imports: [],
  templateUrl: './alertas-stock.html',
  styleUrl: './alertas-stock.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertasStock {
  private readonly inventarioService = inject(InventarioService);

  readonly alertas = signal<Repuesto[]>([]);

  ngOnInit(): void {
    this.inventarioService.getAlertas().subscribe(alertas => this.alertas.set(alertas));
  }
}
