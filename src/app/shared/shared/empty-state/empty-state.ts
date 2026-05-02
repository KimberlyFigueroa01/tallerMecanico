import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyState {
  readonly icon = input<string>('i');
  readonly title = input<string>('Sin datos');
  readonly subtitle = input<string>('No hay elementos para mostrar.');
}
