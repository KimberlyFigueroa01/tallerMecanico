import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  const token = isPlatformBrowser(platformId)
    ? localStorage.getItem('ag_token')
    : null;

  const authRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigateByUrl('/auth');
      }
      return throwError(() => error);
    })
  );
};
