import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { ReportesService, DashboardData } from '../../services/reportes.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  private readonly reportesService = inject(ReportesService);
  readonly data = signal<DashboardData | null>(null);

  ngOnInit(): void {
    this.reportesService.getDashboard().subscribe(value => this.data.set(value));
  }
}
