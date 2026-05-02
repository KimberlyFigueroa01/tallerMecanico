import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrdenService } from '../services/orden.service';
import { OrdenStateService } from '../services/orden-state.service';
import { Orden } from '../models/orden.model';
import { StatusBadge } from '../../shared/shared/status-badge/status-badge';

@Component({
  selector: 'app-orden-detail',
  imports: [StatusBadge],
  templateUrl: './orden-detail.html',
  styleUrl: './orden-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenDetail {
  private readonly ordenService = inject(OrdenService);
  private readonly ordenState = inject(OrdenStateService);
  private readonly route = inject(ActivatedRoute);

  readonly order = signal<Orden | null>(null);
  readonly isLoading = signal(false);
  readonly activeTab = signal('Vehiculo');

  readonly tabs = ['Vehiculo', 'Fotos', 'Notas', 'Informe', 'Tareas', 'Pago', 'Info'];

  readonly totalLabel = computed(() => this.order()?.total ?? 0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.isLoading.set(true);
    this.ordenService.getById(id).subscribe({
      next: orden => {
        this.order.set(orden);
        this.ordenState.setOrden(orden);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  setTab(tab: string): void {
    this.activeTab.set(tab);
  }
}
