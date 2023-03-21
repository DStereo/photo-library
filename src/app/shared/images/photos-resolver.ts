import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ImagesService } from './images.service';

import { Image } from './images.model';

export const photosResolver: ResolveFn<Image[]> = () => {
  const imagesService = inject(ImagesService);

  return imagesService.getImages(0);
};
