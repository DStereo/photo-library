import { Injectable } from '@angular/core';

import { StorageService } from '@core/storage/storage.service';

import { Photo } from '@shared/photos/photos.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private storageService: StorageService) {}

  getAllFavorites(): { [key: string]: Photo } {
    return this.storageService.getItem('favorites') || {};
  }

  getAllFavoritesArray(): Photo[] {
    return Object.values(this.getAllFavorites());
  }

  getFavorite(id: string): Photo | undefined {
    return this.getAllFavorites()[id];
  }

  addToFavorites(photo: Photo): void {
    let favorites = this.getAllFavorites();

    favorites = {
      ...favorites,
      [photo.id]: photo,
    };

    this.storageService.setItem('favorites', favorites);
  }

  removeFromFavorites(id: string): void {
    let favorites = this.getAllFavorites();

    favorites = Object.keys(favorites)
      .filter((favoriteId: string) => favoriteId !== id)
      .reduce((acc, favoriteId) => ({ ...acc, [favoriteId]: favorites[favoriteId] }), {});

    this.storageService.setItem('favorites', favorites);
  }
}
