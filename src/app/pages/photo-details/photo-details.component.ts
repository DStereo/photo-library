import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

import { FavoritesService } from '@shared/favorites/favorites.service';
import { NavigationService } from '@shared/navigation/navigation.service';

import { DestroyDirective } from '@shared/destroy/destroy.directive';

import { Photo } from '@shared/photos/photos.model';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
})
export class PhotoDetailsComponent extends DestroyDirective implements OnInit {
  photo: Photo = {} as Photo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private favoritesService: FavoritesService,
    private navigationService: NavigationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe((data) => (this.photo = data['photo']));
  }

  removeFromFavorites(id: string): void {
    this.favoritesService.removeFromFavorites(id);

    this.navigationService.goToHome();
  }
}
