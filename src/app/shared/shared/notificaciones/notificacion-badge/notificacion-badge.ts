import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-notificacion-badge',
  imports: [],
  templateUrl: './notificacion-badge.html',
  styleUrl: './notificacion-badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificacionBadge {
  readonly count = input<number>(0);
}
