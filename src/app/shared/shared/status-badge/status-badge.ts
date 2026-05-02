import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBadge {
  readonly status = input<string>('');

  readonly statusClass = computed(() => {
    const value = this.status().toLowerCase();
    if (value.includes('abierta') || value.includes('open')) {
      return 'open';
    }
    if (value.includes('progreso') || value.includes('progress')) {
      return 'progress';
    }
    if (value.includes('lista') || value.includes('ready')) {
      return 'ready';
    }
    if (value.includes('cerrada') || value.includes('closed')) {
      return 'closed';
    }
    if (value.includes('alerta') || value.includes('alert')) {
      return 'alert';
    }
    return 'default';
  });
}
