import { InjectionToken } from '@angular/core';

export const PHOTOS_API_URL = new InjectionToken<string>('PHOTOS_API_URL');
export const PHOTOS_PAGE_LIMIT = new InjectionToken<number>('PHOTOS_LIMIT');
export const PHOTOS_LIST_SIZE = new InjectionToken<number>('PHOTOS_LIST_SIZE');
export const PHOTOS_DETAILS_SIZE = new InjectionToken<number>('PHOTOS_DETAILS_SIZE');

export const PHOTOS_API_URL_PROVIDERS = [
  {
    provide: PHOTOS_API_URL,
    useValue: 'https://picsum.photos',
  },
  {
    provide: PHOTOS_PAGE_LIMIT,
    useValue: 9,
  },
  {
    provide: PHOTOS_LIST_SIZE,
    useValue: 300,
  },
  {
    provide: PHOTOS_DETAILS_SIZE,
    useValue: 600,
  },
];
