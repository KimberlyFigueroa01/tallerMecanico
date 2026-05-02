import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  type: ToastType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private readonly toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  readonly toast$ = this.toastSubject.asObservable();

  showError(message: string): void {
    this.toastSubject.next({ type: 'error', message });
  }

  showSuccess(message: string): void {
    this.toastSubject.next({ type: 'success', message });
  }
}
