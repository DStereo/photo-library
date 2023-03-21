import { Component, OnInit } from '@angular/core';

import { FavoritesService } from '../../shared/favorites/favorites.service';

import { Image } from '../../shared/images/images.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites: Image[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getAllFavoritesArray();
  }
}
