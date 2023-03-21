import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { StorageService } from '../../core/storage/storage.service';

import { Image } from '../images/images.model';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let firstImage: Image;
  let secondImage: Image;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem', 'setItem', 'removeItem']);

    firstImage = {
      id: 'id-1',
      author: 'author-1',
      width: 300,
      height: 300,
      url: 'url-1',
      download_url: 'download_url-1',
    };

    secondImage = {
      id: 'id-2',
      author: 'author-2',
      width: 300,
      height: 300,
      url: 'url-2',
      download_url: 'download_url-2',
    };

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

  describe('getAllFavorites', () => {
    it('should return favorites', () => {
      storageServiceSpy.getItem.and.returnValue({
        'id-1': firstImage,
        'id-2': secondImage,
      });

      const result = service.getAllFavorites();

      expect(storageServiceSpy.getItem).toHaveBeenCalledWith('favorites');
      expect(result).toEqual({
        'id-1': firstImage,
        'id-2': secondImage,
      });
    });

    it('should return empty array when favorites is empty', () => {
      storageServiceSpy.getItem.and.returnValue(null);

      const result = service.getAllFavorites();

      expect(storageServiceSpy.getItem).toHaveBeenCalledWith('favorites');
      expect(result).toEqual({});
    });
  });

  describe('getAllFavoritesArray', () => {
    it('should return favorites as array', () => {
      storageServiceSpy.getItem.and.returnValue({
        'id-1': firstImage,
        'id-2': secondImage,
      });

      const result = service.getAllFavoritesArray();

      expect(storageServiceSpy.getItem).toHaveBeenCalledWith('favorites');
      expect(result).toEqual([firstImage, secondImage]);
    });

    it('should return empty array when favorites is empty', () => {
      storageServiceSpy.getItem.and.returnValue(null);

      const result = service.getAllFavoritesArray();

      expect(storageServiceSpy.getItem).toHaveBeenCalledWith('favorites');
      expect(result).toEqual([]);
    });
  });

  describe('getFavorite', () => {
    it('should return favorite', () => {
      storageServiceSpy.getItem.and.returnValue({
        'id-1': firstImage,
        'id-2': secondImage,
      });

      const result = service.getFavorite('id-1');

      expect(storageServiceSpy.getItem).toHaveBeenCalledWith('favorites');
      expect(result).toEqual(firstImage);
    });

    it('should return undefined when favorite is not found', () => {
      storageServiceSpy.getItem.and.returnValue({
        'id-1': firstImage,
        'id-2': secondImage,
      });

      const result = service.getFavorite('id-3');

      expect(storageServiceSpy.getItem).toHaveBeenCalledWith('favorites');
      expect(result).toBeUndefined();
    });
  });

  describe('addToFavorites', () => {
    it('should add an item to favorites', () => {
      storageServiceSpy.getItem.and.returnValue({
        'id-1': firstImage,
      });
      service.addToFavorites(secondImage);

      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('favorites', {
        'id-1': firstImage,
        'id-2': secondImage,
      });
    });

    it('should add an item to favorites when favorites is empty', () => {
      storageServiceSpy.getItem.and.returnValue({});
      service.addToFavorites(firstImage);

      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('favorites', {
        'id-1': firstImage,
      });
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove an item from favorites', () => {
      storageServiceSpy.getItem.and.returnValue({
        'id-1': firstImage,
        'id-2': secondImage,
      });
      service.removeFromFavorites('id-1');

      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('favorites', {
        'id-2': secondImage,
      });
    });

    it('should remove an item from favorites when favorites is empty', () => {
      storageServiceSpy.getItem.and.returnValue(null);
      service.removeFromFavorites('id-1');

      expect(storageServiceSpy.setItem).toHaveBeenCalledWith('favorites', {});
    });
  });
});
