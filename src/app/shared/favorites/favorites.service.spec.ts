import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { StorageService } from '../../core/storage/storage.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem', 'setItem', 'removeItem']);

    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        {
          provide: StorageService,
          useValue: storageServiceSpy,
        },
      ],
    });

    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addToFavorites', () => {
    it('should add an item to favorites', () => {
      storageServiceSpy.getItem.and.returnValue(['id-1']);
      service.addToFavorites('id-2');

      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('favorites', ['id-1', 'id-2']);
    });

    it('should add an item to favorites when favorites is empty', () => {
      storageServiceSpy.getItem.and.returnValue([]);
      service.addToFavorites('id-1');

      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('favorites', ['id-1']);
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove an item from favorites', () => {
      storageServiceSpy.getItem.and.returnValue(['id-1', 'id-2']);
      service.removeFromFavorites('id-1');

      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('favorites', ['id-2']);
    });

    it('should remove an item from favorites when favorites is empty', () => {
      storageServiceSpy.getItem.and.returnValue([]);
      service.removeFromFavorites('id-1');

      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('favorites', []);
    });
  });
});
