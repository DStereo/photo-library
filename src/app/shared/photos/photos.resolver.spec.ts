import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterState, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { photosResolver } from './photos-resolver';
import { PhotosService } from './photos.service';

import { Photo } from './photos.model';

describe('photosResolver', () => {
  const executeResolver: ResolveFn<Photo[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => photosResolver(...resolverParameters));
  let photosServiceSpy: jasmine.SpyObj<PhotosService>;
  let routerStateSpy: jasmine.SpyObj<RouterState>;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    photosServiceSpy = jasmine.createSpyObj('PhotosService', ['getPhotos']);
    routerStateSpy = jasmine.createSpyObj('RouterState', [], ['snapshot']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: PhotosService,
          useValue: photosServiceSpy,
        },
        {
          provide: RouterState,
          useValue: routerStateSpy,
        },
      ],
    });

    activatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routerStateSnapshot = TestBed.inject(RouterState).snapshot;
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  describe('resolve', () => {
    it('should call photosService.getPhotos with 0', () => {
      executeResolver(activatedRouteSnapshot, routerStateSnapshot);

      expect(photosServiceSpy.getPhotos).toHaveBeenCalledWith(0);
    });
  });
});
