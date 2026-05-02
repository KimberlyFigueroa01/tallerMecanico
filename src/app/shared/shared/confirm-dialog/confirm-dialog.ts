import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialog {
  readonly open = input<boolean>(false);
  readonly title = input<string>('Confirmar accion');
  readonly message = input<string>('Estas seguro de continuar?');
  readonly confirmLabel = input<string>('Confirmar');
  readonly cancelLabel = input<string>('Cancelar');

  readonly confirm = output<void>();
  readonly cancel = output<void>();
}
