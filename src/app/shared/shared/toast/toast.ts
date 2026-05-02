import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toast {
  private readonly errorService = inject(ErrorService);
  readonly toast = toSignal(this.errorService.toast$, { initialValue: null });
}
