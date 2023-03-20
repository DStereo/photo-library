import { InjectionToken } from '@angular/core';

export const IMAGES_API_URL = new InjectionToken<string>('IMAGES_API_URL');
export const IMAGES_PAGE_LIMIT = new InjectionToken<number>('IMAGES_LIMIT');
export const IMAGES_LIST_SIZE = new InjectionToken<number>('IMAGES_LIST_SIZE');
export const IMAGES_DETAILS_SIZE = new InjectionToken<number>('IMAGES_DETAILS_SIZE');

export const IMAGES_API_URL_PROVIDERS = [
  {
    provide: IMAGES_API_URL,
    useValue: 'https://picsum.photos',
  },
  {
    provide: IMAGES_PAGE_LIMIT,
    useValue: 9,
  },
  {
    provide: IMAGES_LIST_SIZE,
    useValue: 300,
  },
  {
    provide: IMAGES_DETAILS_SIZE,
    useValue: 600,
  },
];
