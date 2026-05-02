import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-cliente-detail',
  imports: [],
  templateUrl: './cliente-detail.html',
  styleUrl: './cliente-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly clienteService = inject(ClienteService);

  readonly cliente = signal<Cliente | null>(null);
  readonly activeTab = signal('Resumen');
  readonly tabs = ['Resumen', 'Vehiculos', 'Historial', 'Pagos'];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.clienteService.getById(id).subscribe(cliente => this.cliente.set(cliente));
  }

  setTab(tab: string): void {
    this.activeTab.set(tab);
  }
}
