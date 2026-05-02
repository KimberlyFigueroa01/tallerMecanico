import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-orden-diagnostico',
  imports: [ReactiveFormsModule],
  templateUrl: './orden-diagnostico.html',
  styleUrl: './orden-diagnostico.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenDiagnostico {
  readonly isSubmitting = signal(false);

  readonly form = new FormGroup({
    sintomas: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    diagnostico: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    recomendaciones: new FormControl('', { nonNullable: true })
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    setTimeout(() => this.isSubmitting.set(false), 400);
  }
}
