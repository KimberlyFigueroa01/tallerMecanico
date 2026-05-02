import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

const decodePayload = (token: string): Record<string, unknown> | null => {
  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + (4 - (normalized.length % 4)) % 4, '=');
    const decoded = atob(padded);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const roleGuard: CanActivateFn = route => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const roles = (route.data?.['roles'] ?? []) as string[];
  if (!roles.length) {
    return true;
  }

  const token = localStorage.getItem('ag_token');
  if (!token) {
    return false;
  }

  const payload = decodePayload(token);
  const role = typeof payload?.['role'] === 'string' ? (payload['role'] as string) : '';

  return roles.includes(role);
};
