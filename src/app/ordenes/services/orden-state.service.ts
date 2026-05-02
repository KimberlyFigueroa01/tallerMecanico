import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Orden } from '../models/orden.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenStateService {
  private readonly ordenSubject = new BehaviorSubject<Orden | null>(null);
  readonly orden$ = this.ordenSubject.asObservable();

  setOrden(orden: Orden | null): void {
    this.ordenSubject.next(orden);
  }

  getOrden(): Orden | null {
    return this.ordenSubject.value;
  }
}
