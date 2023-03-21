import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { PhotosService } from './photos.service';
import { PHOTOS_CONFIG } from './photos.token';

import { Photo, PhotosConfig } from '@shared/photos/photos.model';

describe('PhotosService', () => {
  let service: PhotosService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const photosConfig: PhotosConfig = {
    apiUrl: 'url',
    apiDelay: 300,
    pageLimit: 9,
    listSize: 300,
    detailsSize: 600,
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of([]),
    });

    TestBed.configureTestingModule({
      providers: [
        PhotosService,
        {
          provide: PHOTOS_CONFIG,
          useValue: photosConfig,
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });

    service = TestBed.inject(PhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPhotos', () => {
    it('should return an array of photos', fakeAsync(() => {
      const page = 0;
      const { apiUrl, apiDelay, pageLimit } = photosConfig;

      httpClientSpy.get.and.returnValue(
        of([
          {
            id: '1',
            author: 'author',
            width: 5000,
            height: 3333,
            url: 'url',
            download_url: 'download_url/id/1/5000/3333',
          },
        ])
      );

      let result: Photo[] = [];

      const sub = service.getPhotos(page).subscribe((photos) => {
        result = photos;
      });

      tick(apiDelay);

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${apiUrl}/v2/list?page=${page}&limit=${pageLimit}`);
      expect(result).toEqual([
        {
          id: '1',
          author: 'author',
          width: 300,
          height: 300,
          url: 'url',
          download_url: 'download_url/id/1/300',
        },
      ]);

      sub.unsubscribe();
    }));
  });

  describe('getPhotoDetails', () => {
    it('should return photo details', fakeAsync(() => {
      const { apiUrl, apiDelay } = photosConfig;
      const id = 'id';

      httpClientSpy.get.and.returnValue(
        of({
          id: '1',
          author: 'author',
          width: 5000,
          height: 3333,
          url: 'url',
          download_url: 'download_url/id/1/5000/3333',
        })
      );

      let result: Photo = {} as Photo;

      const sub = service.getPhotoDetails(id).subscribe((photo) => (result = photo));

      tick(apiDelay);

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${apiUrl}/id/${id}/info`);
      expect(result).toEqual({
        id: '1',
        author: 'author',
        width: 600,
        height: 600,
        url: 'url',
        download_url: 'download_url/id/1/600',
      });

      sub.unsubscribe();
    }));
  });
});
