import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { PhotosService } from './photos.service';

import { Photo } from './photo.model';

export const photosResolver: ResolveFn<Photo[]> = () => {
  const photosService = inject(PhotosService);

  return photosService.getPhotos(0);
};
