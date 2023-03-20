import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { IMAGES_API_URL, IMAGES_LIST_SIZE, IMAGES_PAGE_LIMIT } from './images.token';

import { convertImageSizes, convertImagesSizes } from './images.helpers';

import { Image } from './images.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(
    @Inject(IMAGES_API_URL) private imagesApiUrl: string,
    @Inject(IMAGES_PAGE_LIMIT) private imagesPageLimit: number,
    @Inject(IMAGES_LIST_SIZE) private imagesListSize: number,
    private httpClient: HttpClient
  ) {}

  getImages(page: number): Observable<Image[]> {
    return this.httpClient
      .get<Image[]>(`${this.imagesApiUrl}/v2/list?page=${page}&limit=${this.imagesPageLimit}`)
      .pipe(map((images) => convertImagesSizes(images, this.imagesListSize)));
  }

  getImageDetails(id: string): Observable<Image> {
    return this.httpClient
      .get<Image>(`${this.imagesApiUrl}/id/${id}/info`)
      .pipe(map((image) => convertImageSizes(image, this.imagesListSize)));
  }
}
