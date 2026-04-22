import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AutenticacionService } from './autenticacion.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AutenticacionService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  theme = environment.theme;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.style.setProperty('--primary-color', this.theme.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', this.theme.secondaryColor);
      document.documentElement.style.setProperty('--background-color', this.theme.background);
    }
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login exitoso');
        this.router.navigate(['/reportes']);
      },
      error: err => {
        console.error('Error en el login', err);
      }
    });
  }
}
