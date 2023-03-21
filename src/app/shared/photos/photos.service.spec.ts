import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { PhotosService } from './photos.service';
import { PHOTOS_API_URL, PHOTOS_DETAILS_SIZE, PHOTOS_LIST_SIZE, PHOTOS_PAGE_LIMIT } from './photos.token';

import { Photo } from './photo.model';

describe('PhotosService', () => {
  let service: PhotosService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const photosApiUrl = 'url';
  const photosPageLimit = 9;
  const photosListSize = 300;
  const photosDetailsSize = 600;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of([]),
    });

    TestBed.configureTestingModule({
      providers: [
        PhotosService,
        {
          provide: PHOTOS_API_URL,
          useValue: photosApiUrl,
        },
        {
          provide: PHOTOS_PAGE_LIMIT,
          useValue: photosPageLimit,
        },
        {
          provide: PHOTOS_LIST_SIZE,
          useValue: photosListSize,
        },
        {
          provide: PHOTOS_DETAILS_SIZE,
          useValue: photosDetailsSize,
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

      tick();

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${photosApiUrl}/v2/list?page=${page}&limit=${photosPageLimit}`);
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

      tick();

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${photosApiUrl}/id/${id}/info`);
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
