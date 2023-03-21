import { Component, OnInit } from '@angular/core';

import { FavoritesService } from '@shared/favorites/favorites.service';

import { Photo } from '@shared/photos/photo.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: Photo[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getAllFavoritesArray();
  }
}
