import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AutenticacionService } from '../login/autenticacion.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPassword {
  private readonly authService = inject(AutenticacionService);
  private readonly router = inject(Router);

  readonly theme = environment.theme;
  readonly formSubmitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  });

  submit(): void {
    this.formSubmitted.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email } = this.form.getRawValue();
    this.isSubmitting.set(true);

    this.authService.requestPasswordReset(email).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.successMessage.set('Revisa tu correo para continuar el proceso.');
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set('No fue posible enviar el correo. Intenta mas tarde.');
      }
    });
  }

  backToLogin(): void {
    this.router.navigateByUrl('/auth');
  }
}
