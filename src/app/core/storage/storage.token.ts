import { InjectionToken } from '@angular/core';

export const STORAGE_KEY = new InjectionToken<string>('STORAGE_KEY');

export const STORAGE_KEY_PROVIDER = {
  provide: STORAGE_KEY,
  useValue: 'photo-library',
};
