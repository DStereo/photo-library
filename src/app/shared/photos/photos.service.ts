import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { PHOTOS_API_URL, PHOTOS_DETAILS_SIZE, PHOTOS_LIST_SIZE, PHOTOS_PAGE_LIMIT } from './photos.token';

import { convertPhotoSizes, convertPhotosSizes } from './photos.helpers';

import { Photo } from './photo.model';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(
    @Inject(PHOTOS_API_URL) private photosApiUrl: string,
    @Inject(PHOTOS_PAGE_LIMIT) private photosPageLimit: number,
    @Inject(PHOTOS_LIST_SIZE) private photosListSize: number,
    @Inject(PHOTOS_DETAILS_SIZE) private photosDetailsSize: number,
    private httpClient: HttpClient
  ) {}

  getPhotos(page: number): Observable<Photo[]> {
    return this.httpClient
      .get<Photo[]>(`${this.photosApiUrl}/v2/list?page=${page}&limit=${this.photosPageLimit}`)
      .pipe(map((photos) => convertPhotosSizes(photos, this.photosListSize)));
  }

  getPhotoDetails(id: string): Observable<Photo> {
    return this.httpClient
      .get<Photo>(`${this.photosApiUrl}/id/${id}/info`)
      .pipe(map((photo) => convertPhotoSizes(photo, this.photosDetailsSize)));
  }
}
