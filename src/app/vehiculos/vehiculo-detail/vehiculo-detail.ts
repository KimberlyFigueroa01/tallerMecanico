import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VehiculoService } from '../services/vehiculo.service';
import { Vehiculo } from '../models/vehiculo.model';

@Component({
  selector: 'app-vehiculo-detail',
  imports: [],
  templateUrl: './vehiculo-detail.html',
  styleUrl: './vehiculo-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiculoDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly vehiculoService = inject(VehiculoService);

  readonly vehiculo = signal<Vehiculo | null>(null);
  readonly activeTab = signal('Historial');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.vehiculoService.getById(id).subscribe(value => this.vehiculo.set(value));
  }
}
