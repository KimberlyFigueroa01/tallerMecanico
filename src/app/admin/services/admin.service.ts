import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';
import { Taller } from '../models/taller.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly errorService = inject(ErrorService);

  private talleres: Taller[] = [
    { id: 'T-1', nombre: 'Taller Edwin', dominio: 'taller-edwin', plan: 'Pro', usuarios: 12, estado: 'Activo' },
    { id: 'T-2', nombre: 'Taller Andres', dominio: 'taller-andres', plan: 'Starter', usuarios: 6, estado: 'Activo' }
  ];

  getTalleres(): Observable<Taller[]> {
    return of(this.talleres).pipe(
      delay(300),
      catchError(error => {
        this.errorService.showError('No se pudieron cargar los talleres.');
        return throwError(() => error);
      })
    );
  }

  getTallerById(id: string): Observable<Taller | null> {
    return of(this.talleres.find(item => item.id === id) ?? null).pipe(delay(300));
  }
}
