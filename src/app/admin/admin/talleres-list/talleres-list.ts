import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from '../../services/admin.service';
import { Taller } from '../../models/taller.model';

@Component({
  selector: 'app-talleres-list',
  imports: [],
  templateUrl: './talleres-list.html',
  styleUrl: './talleres-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalleresList {
  private readonly adminService = inject(AdminService);
  private readonly router = inject(Router);

  readonly talleres = signal<Taller[]>([]);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.adminService.getTalleres().subscribe({
      next: items => {
        this.talleres.set(items);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  open(taller: Taller): void {
    this.router.navigate(['/admin', taller.id]);
  }
}
