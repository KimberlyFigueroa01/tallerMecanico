import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AdminService } from '../../services/admin.service';
import { Taller } from '../../models/taller.model';

@Component({
  selector: 'app-taller-detail',
  imports: [],
  templateUrl: './taller-detail.html',
  styleUrl: './taller-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TallerDetail {
  private readonly adminService = inject(AdminService);
  private readonly route = inject(ActivatedRoute);

  readonly taller = signal<Taller | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.adminService.getTallerById(id).subscribe(value => this.taller.set(value));
  }
}
