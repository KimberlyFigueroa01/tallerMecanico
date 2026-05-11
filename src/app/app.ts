import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

import { ThemeService } from './shared/services/theme.service';
import { ConfiguracionService } from './shared/services/configuracion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly configService = inject(ConfiguracionService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Escuchamos cambios en la URL (parámetros de consulta)
    this.route.queryParams.subscribe(params => {
      const taller = params['taller'];
      if (taller) {
        this.configService.aplicarPorNombre(taller);
      } else {
        this.themeService.init();
      }
    });
  }
}
