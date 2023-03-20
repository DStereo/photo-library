import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ImagesService } from './images.service';

import { Image } from './images.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesResolver {
  constructor(private imagesService: ImagesService) {}

  resolve(): Observable<Image[]> {
    return this.imagesService.getImages(0);
  }
}
