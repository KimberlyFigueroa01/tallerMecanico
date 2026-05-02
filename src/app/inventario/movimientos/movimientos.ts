import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-movimientos',
  imports: [],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Movimientos {
  readonly movimientos = [
    { fecha: '2026-05-01', usuario: 'Carlos Ruiz', cantidad: 5, referencia: 'OT-1001' },
    { fecha: '2026-05-02', usuario: 'Laura Perez', cantidad: -2, referencia: 'OT-1002' }
  ];
}
