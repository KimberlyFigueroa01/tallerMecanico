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
    // 1. Cargamos lo que esté guardado en memoria
    this.configService.init();

    // 2. Escuchamos cambios en la URL para sobreescribir (si existe el parámetro)
    this.route.queryParams.subscribe(params => {
      const taller = params['taller'];
      if (taller) {
        this.configService.aplicarPorNombre(taller);
      } else {
        // Si no hay parámetro Y no hay nada guardado, aplicamos el default del env
        if (!localStorage.getItem('app_taller')) {
          this.themeService.init();
        }
      }
    });
  }
}
