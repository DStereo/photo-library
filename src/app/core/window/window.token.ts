import { FactoryProvider, InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('WINDOW');

export const WINDOW_PROVIDER: FactoryProvider = {
  provide: WINDOW,
  useFactory: () => window,
};
