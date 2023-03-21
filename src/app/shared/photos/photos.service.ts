import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';

import { PHOTOS_CONFIG } from './photos.token';

import { convertPhotoSizes, convertPhotosSizes } from './photos.helpers';

import { Photo, PhotosConfig } from './photos.model';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(@Inject(PHOTOS_CONFIG) private photosConfig: PhotosConfig, private httpClient: HttpClient) {}

  getPhotos(page: number): Observable<Photo[]> {
    const { apiUrl, pageLimit, listSize, apiDelay } = this.photosConfig;

    return this.httpClient.get<Photo[]>(`${apiUrl}/v2/list?page=${page}&limit=${pageLimit}`).pipe(
      map((photos) => convertPhotosSizes(photos, listSize)),
      delay(apiDelay)
    );
  }

  getPhotoDetails(id: string): Observable<Photo> {
    const { apiUrl, detailsSize, apiDelay } = this.photosConfig;

    return this.httpClient.get<Photo>(`${apiUrl}/id/${id}/info`).pipe(
      map((photo) => convertPhotoSizes(photo, detailsSize)),
      delay(apiDelay)
    );
  }
}
