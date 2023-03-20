import { Injectable } from '@angular/core';

import { StorageService } from '../../core/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private storageService: StorageService) {}

  getFavorites(): string[] {
    return this.storageService.getItem('favorites') || [];
  }

  addToFavorites(id: string): void {
    const favorites = this.storageService.getItem('favorites') || [];
    favorites.push(id);

    this.storageService.setItem('favorites', favorites);
  }

  removeFromFavorites(id: string): void {
    let favorites = this.storageService.getItem('favorites') || [];

    favorites = favorites.filter((favoriteId: string) => favoriteId !== id);

    this.storageService.setItem('favorites', favorites);
  }
}
