import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { NavigationService } from '../navigation/navigation.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PhotosService } from './photos.service';

import { Photo } from './photos.model';

export const photoDetailsResolver: ResolveFn<Photo | boolean> = (route) => {
  const navigationService = inject(NavigationService);
  const favoritesService = inject(FavoritesService);
  const photosService = inject(PhotosService);

  const id = route.paramMap.get('id');

  if (!id) {
    return navigationService.goToHome();
  }

  const favorite = favoritesService.getFavorite(id);

  if (!favorite) {
    return navigationService.goToHome();
  }

  return photosService.getPhotoDetails(favorite.id);
};
