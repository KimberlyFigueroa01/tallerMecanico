import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { PagoService } from '../../services/pago.service';
import { Pago } from '../../models/pago.model';

@Component({
  selector: 'app-pagos-list',
  imports: [],
  templateUrl: './pagos-list.html',
  styleUrl: './pagos-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagosList {
  private readonly pagoService = inject(PagoService);
  readonly pagos = signal<Pago[]>([]);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.pagoService.getAll().subscribe({
      next: items => {
        this.pagos.set(items);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}
