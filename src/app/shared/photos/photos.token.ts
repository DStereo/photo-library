import { InjectionToken } from '@angular/core';

export const PHOTOS_CONFIG = new InjectionToken<string>('PHOTOS_CONFIG');

export const PHOTOS_PROVIDERS = [
  {
    provide: PHOTOS_CONFIG,
    useValue: {
      apiUrl: 'https://picsum.photos',
      apiDelay: 300,
      pageLimit: 9,
      listSize: 300,
      detailsSize: 600,
    },
  },
];
