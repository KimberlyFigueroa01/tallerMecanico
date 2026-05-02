import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly _ = this.restoreFromStorage();

  login(email: string, password: string): Observable<User | null> {
    return this.http
      .post<{ access_token: string }>('/auth/login', { email, password })
      .pipe(
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('ag_token', response.access_token);
          }
          this.currentUserSubject.next(this.decodeUser(response.access_token));
        }),
        map(() => this.currentUserSubject.value)
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('ag_token');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('ag_token')
      : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();  
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.http.post<void>('/auth/forgot-password', { email });
  }

  private decodeUser(token: string): User | null {
    try {
      const payload = token.split('.')[1];
      if (!payload) {
        return null;
      }
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(normalized.length + (4 - (normalized.length % 4)) % 4, '=');
      const decoded = atob(padded);
      const data = JSON.parse(decoded) as Record<string, unknown>;

      return {
        id: typeof data['id'] === 'string' ? data['id'] : undefined,
        name: typeof data['name'] === 'string' ? data['name'] : undefined,
        email: typeof data['email'] === 'string' ? data['email'] : undefined,
        role: typeof data['role'] === 'string' ? data['role'] : undefined,
        avatar: typeof data['avatar'] === 'string' ? data['avatar'] : undefined
      };
    } catch {
      return null;
    }
  }

  private restoreFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem('ag_token');
    if (token) {
      this.currentUserSubject.next(this.decodeUser(token));
    }
  }
}
