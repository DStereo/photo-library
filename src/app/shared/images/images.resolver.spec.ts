import { TestBed } from '@angular/core/testing';

import { ImagesResolver } from './images.resolver';
import { ImagesService } from './images.service';

describe('ImagesResolver', () => {
  let resolver: ImagesResolver;
  let imagesServiceSpy: jasmine.SpyObj<ImagesService>;

  beforeEach(() => {
    imagesServiceSpy = jasmine.createSpyObj('ImagesService', ['getImages']);

    TestBed.configureTestingModule({
      providers: [
        ImagesResolver,
        {
          provide: ImagesService,
          useValue: imagesServiceSpy,
        },
      ],
    });

    resolver = TestBed.inject(ImagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  describe('resolve', () => {
    it('should call imagesService.getImages with 0', () => {
      resolver.resolve();

      expect(imagesServiceSpy.getImages).toHaveBeenCalledWith(0);
    });
  });
});
