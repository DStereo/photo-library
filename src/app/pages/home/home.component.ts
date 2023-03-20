import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FavoritesService } from '../../shared/favorites/favorites.service';

import { Image } from '../../shared/images/images.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  images: Image[] = [];

  constructor(private activatedRoute: ActivatedRoute, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.images = this.activatedRoute.snapshot.data['images'];
  }

  addToFavorites(image: Image): void {
    this.favoritesService.addToFavorites(image);
  }
}
