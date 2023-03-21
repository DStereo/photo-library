import { Injectable } from '@angular/core';

import { StorageService } from '../../core/storage/storage.service';

import { Image } from '../images/images.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private storageService: StorageService) {}

  getAllFavorites(): { [key: string]: Image } {
    return this.storageService.getItem('favorites') || {};
  }

  getAllFavoritesArray(): Image[] {
    return Object.values(this.getAllFavorites());
  }

  getFavorite(id: string): Image | undefined {
    return this.getAllFavorites()[id];
  }

  addToFavorites(image: Image): void {
    let favorites = this.getAllFavorites();

    favorites = {
      ...favorites,
      [image.id]: image,
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
