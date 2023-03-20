import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { WINDOW } from '../window/window.token';
import { STORAGE_KEY } from './storage.token';

describe('StorageService', () => {
  let service: StorageService;
  let windowSpy: jasmine.SpyObj<Window>;
  const storageKey = 'storage-key';

  beforeEach(() => {
    windowSpy = jasmine.createSpyObj('Window', [], {
      localStorage: {
        setItem: () => {},
        getItem: () => {},
        removeItem: () => {},
      },
    });

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: WINDOW, useValue: windowSpy },
        { provide: STORAGE_KEY, useValue: storageKey },
      ],
    });

    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItem', () => {
    it('should call localStorage.getItem', () => {
      const getItemSpy = spyOn(windowSpy.localStorage, 'getItem').and.returnValue('[1, 2, 3]');

      const result = service.getItem('favorites');

      expect(getItemSpy).toHaveBeenCalledWith(`${storageKey}-favorites`);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should throw an error', () => {
      spyOn(windowSpy.localStorage, 'getItem').and.returnValue('[1, 2, 3');

      expect(() => service.getItem('favorites')).toThrowError('StorageService.getItem: Error while getting item');
    });
  });

  describe('setItem', () => {
    it('should call localStorage.setItem', () => {
      const setItemSpy = spyOn(windowSpy.localStorage, 'setItem');

      service.setItem('favorites', 'item-value');

      expect(setItemSpy).toHaveBeenCalledWith(`${storageKey}-favorites`, JSON.stringify('item-value'));
    });

    it('should throw an error', () => {
      spyOn(windowSpy.localStorage, 'setItem').and.throwError('Error while setting item');

      expect(() => service.setItem('item-key', 'item-value')).toThrowError(
        'StorageService.setItem: Error while setting item'
      );
    });
  });

  describe('removeItem', () => {
    it('should call localStorage.removeItem', () => {
      const removeItemSpy = spyOn(windowSpy.localStorage, 'removeItem');

      service.removeItem('item-key');

      expect(removeItemSpy).toHaveBeenCalledWith(`${storageKey}-item-key`);
    });
  });
});
