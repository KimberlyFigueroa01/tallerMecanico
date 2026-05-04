import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { VehiculoService } from '../services/vehiculo.service';
import { Vehiculo } from '../models/vehiculo.model';

@Component({
  selector: 'app-vehiculos-list',
  imports: [RouterLink],
  templateUrl: './vehiculos-list.html',
  styleUrl: './vehiculos-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiculosList {
  private readonly vehiculoService = inject(VehiculoService);
  private readonly router = inject(Router);

  readonly vehiculos = signal<Vehiculo[]>([]);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.vehiculoService.getAll().subscribe({
      next: items => {
        this.vehiculos.set(items);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  open(vehiculo: Vehiculo): void {
    this.router.navigate(['/vehiculos', vehiculo.id]);
  }
}
