import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ImagesService } from './images.service';
import { IMAGES_API_URL, IMAGES_DETAILS_SIZE, IMAGES_LIST_SIZE, IMAGES_PAGE_LIMIT } from './images.token';

import { Image } from './images.model';

describe('ImagesService', () => {
  let service: ImagesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const imagesApiUrl = 'url';
  const imagesPageLimit = 9;
  const imagesListSize = 300;
  const imagesDetailsSize = 600;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of([]),
    });

    TestBed.configureTestingModule({
      providers: [
        ImagesService,
        {
          provide: IMAGES_API_URL,
          useValue: imagesApiUrl,
        },
        {
          provide: IMAGES_PAGE_LIMIT,
          useValue: imagesPageLimit,
        },
        {
          provide: IMAGES_LIST_SIZE,
          useValue: imagesListSize,
        },
        {
          provide: IMAGES_DETAILS_SIZE,
          useValue: imagesDetailsSize,
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });

    service = TestBed.inject(ImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getImages', () => {
    it('should return an array of images', fakeAsync(() => {
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

      let result: Image[] = [];

      const sub = service.getImages(page).subscribe((images) => {
        result = images;
      });

      tick();

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${imagesApiUrl}/v2/list?page=${page}&limit=${imagesPageLimit}`);
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

  describe('getImage', () => {
    it('should return an image', fakeAsync(() => {
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

      let result: Image = {} as Image;

      const sub = service.getImageDetails(id).subscribe((image) => {
        result = image;
      });

      tick();

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${imagesApiUrl}/id/${id}/info`);
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
