import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ImagesService } from './images.service';
import { IMAGES_API_URL, IMAGES_DETAILS_SIZE, IMAGES_LIST_SIZE, IMAGES_PAGE_LIMIT } from './images.token';

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
    it('should return an array of images', () => {
      const page = 0;

      service.getImages(page);

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${imagesApiUrl}/v2/list?page=${page}&limit=${imagesPageLimit}`);
    });
  });

  describe('getImage', () => {
    it('should return an image', () => {
      const id = 'id';

      service.getImageDetails(id);

      expect(httpClientSpy.get).toHaveBeenCalledWith(`${imagesApiUrl}/id/${id}/info`);
    });
  });
});
