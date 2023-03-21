import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { from } from 'rxjs';

import { NavigationService } from '../navigation/navigation.service';
import { FavoritesService } from '../favorites/favorites.service';

import { Image } from './images.model';

export const photoDetailsResolver: ResolveFn<Image | boolean> = (route) => {
  const navigationService = inject(NavigationService);
  const favoritesService = inject(FavoritesService);

  const id = route.paramMap.get('id');

  if (!id) {
    return from(navigationService.goToHome());
  }

  const favorite = favoritesService.getFavorite(id);

  if (!favorite) {
    return from(navigationService.goToHome());
  }

  return favorite;
};
