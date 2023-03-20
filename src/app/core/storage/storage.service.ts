import { Inject, Injectable } from '@angular/core';

import { WINDOW } from '../window/window.token';
import { STORAGE_KEY } from './storage.token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(WINDOW) private window: Window, @Inject(STORAGE_KEY) private storageKey: string) {}

  getItem(key: string): any {
    try {
      const item = this.window.localStorage.getItem(`${this.storageKey}-${key}`);

      return item ? JSON.parse(item) : item;
    } catch (e) {
      throw new Error('StorageService.getItem: Error while getting item');
    }
  }

  setItem(key: string, item: any): void {
    try {
      this.window.localStorage.setItem(`${this.storageKey}-${key}`, JSON.stringify(item));
    } catch (e) {
      throw new Error('StorageService.setItem: Error while setting item');
    }
  }

  removeItem(key: string): void {
    this.window.localStorage.removeItem(`${this.storageKey}-${key}`);
  }
}
