import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { STORAGE_KEY } from './storage.token';

describe('StorageService', () => {
  let service: StorageService;
  let windowSpy: jasmine.SpyObj<Window>;
  const storageKey = 'storage-key';

  beforeEach(() => {
    windowSpy = jasmine.createSpyObj('Window', {
      localStorage: {
        setItem: () => {},
        getItem: () => {},
        removeItem: () => {},
      },
    });

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: 'WINDOW', useValue: windowSpy },
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
      service.getItem('item-key');

      expect(windowSpy.localStorage.getItem).toHaveBeenCalledWith(`${storageKey}-item-key`);
    });
  });

  describe('setItem', () => {
    it('should call localStorage.setItem', () => {
      service.setItem('item-key', 'item-value');

      expect(windowSpy.localStorage.setItem).toHaveBeenCalledWith(
        `${storageKey}-item-key`,
        JSON.stringify('item-value')
      );
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
      service.removeItem('item-key');

      expect(windowSpy.localStorage.removeItem).toHaveBeenCalledWith(`${storageKey}-item-key`);
    });
  });
});
