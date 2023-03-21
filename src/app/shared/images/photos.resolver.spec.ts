import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterState, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { photosResolver } from './photos-resolver';
import { ImagesService } from './images.service';

import { Image } from './images.model';

describe('photosResolver', () => {
  const executeResolver: ResolveFn<Image[]> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => photosResolver(...resolverParameters));
  let imagesServiceSpy: jasmine.SpyObj<ImagesService>;
  let routerStateSpy: jasmine.SpyObj<RouterState>;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    imagesServiceSpy = jasmine.createSpyObj('ImagesService', ['getImages']);
    routerStateSpy = jasmine.createSpyObj('RouterState', [], ['snapshot']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ImagesService,
          useValue: imagesServiceSpy,
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
    it('should call imagesService.getImages with 0', () => {
      executeResolver(activatedRouteSnapshot, routerStateSnapshot);

      expect(imagesServiceSpy.getImages).toHaveBeenCalledWith(0);
    });
  });
});
