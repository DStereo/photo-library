import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FavoritesService } from '@shared/favorites/favorites.service';

import { Photo } from '@shared/photos/photo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private activatedRoute: ActivatedRoute, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }

  addToFavorites(photo: Photo): void {
    this.favoritesService.addToFavorites(photo);
  }
}
