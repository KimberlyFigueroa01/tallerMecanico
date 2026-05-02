import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { StatusBadge } from '../../shared/shared/status-badge/status-badge';

@Component({
  selector: 'app-clientes-list',
  imports: [StatusBadge],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientesList {
  private readonly clienteService = inject(ClienteService);
  private readonly router = inject(Router);

  readonly clientes = signal<Cliente[]>([]);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(search: string = ''): void {
    this.isLoading.set(true);
    this.clienteService.getAll(search).subscribe({
      next: items => {
        this.clientes.set(items);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  open(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id]);
  }
}
