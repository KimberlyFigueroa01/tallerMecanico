import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-proveedores-list',
  imports: [],
  templateUrl: './proveedores-list.html',
  styleUrl: './proveedores-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProveedoresList {
  readonly proveedores = ['AutoParts SA', 'FrenosPro', 'Motores Latam'];
}
