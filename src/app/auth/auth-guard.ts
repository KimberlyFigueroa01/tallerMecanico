import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  const token = isPlatformBrowser(platformId)
    ? localStorage.getItem('ag_token')
    : null;

  if (token) {
    return true;
  }

  router.navigateByUrl('/auth');
  return false;
};
