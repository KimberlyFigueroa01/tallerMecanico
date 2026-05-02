import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AutenticacionService } from '../../../auth/login/autenticacion.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
  private readonly authService = inject(AutenticacionService);
  private readonly user = toSignal(this.authService.getCurrentUser(), { initialValue: null });

  readonly items = [
    { icon: '📊', label: 'Dashboard', route: '/dashboard' },
    { icon: '👥', label: 'Clientes', route: '/clientes' },
    { icon: '🚗', label: 'Vehiculos', route: '/vehiculos' },
    { icon: '📋', label: 'Ordenes', route: '/ordenes' },
    { icon: '📦', label: 'Inventario', route: '/inventario' },
    { icon: '💳', label: 'Pagos', route: '/pagos' },
    { icon: '📈', label: 'Reportes', route: '/reportes' },
    { icon: '🛡️', label: 'Admin', route: '/admin', role: 'SUPERADMIN' }
  ];

  readonly visibleItems = computed(() => {
    const role = this.user()?.role;
    return this.items.filter(item => (item.role ? item.role === role : true));
  });
}
