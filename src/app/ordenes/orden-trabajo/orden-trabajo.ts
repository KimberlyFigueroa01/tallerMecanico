import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Tarea } from '../models/orden.model';

@Component({
  selector: 'app-orden-trabajo',
  imports: [],
  templateUrl: './orden-trabajo.html',
  styleUrl: './orden-trabajo.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenTrabajo {
  readonly tareas = input<Tarea[]>([]);
  readonly toggle = output<Tarea>();
}
