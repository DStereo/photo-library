import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  ResolveFn,
  Router,
  RouterState,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { photoDetailsResolver } from './photo-details.resolver';
import { NavigationService } from '../navigation/navigation.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PhotosService } from '@shared/photos/photos.service';
import { PHOTOS_CONFIG } from '@shared/photos/photos.token';

import { HomeComponent } from '@app/pages/home/home.component';
import { PhotoDetailsComponent } from '@app/pages/photo-details/photo-details.component';

import { Photo, PhotosConfig } from './photos.model';

describe('photoDetailsResolver', () => {
  const executeResolver: ResolveFn<Photo | boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => photoDetailsResolver(...resolverParameters));
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let router: Router;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let routerStateSpy: jasmine.SpyObj<RouterState>;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;
  let photosServiceSpy: jasmine.SpyObj<PhotosService>;
  const photosConfig: PhotosConfig = {
    apiUrl: 'url',
    apiDelay: 300,
    pageLimit: 9,
    listSize: 300,
    detailsSize: 600,
  };

  beforeEach(() => {
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', {
      goToHome: Promise.resolve(true),
    });
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['getFavorite']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: convertToParamMap({ id: '123' }),
      },
    });
    routerStateSpy = jasmine.createSpyObj('RouterState', [], ['snapshot']);
    photosServiceSpy = jasmine.createSpyObj('PhotosService', ['getPhotoDetails']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent,
          },
          {
            path: 'photos/:id',
            component: PhotoDetailsComponent,
          },
        ]),
      ],
      providers: [
        {
          provide: PHOTOS_CONFIG,
          useValue: photosConfig,
        },
        {
          provide: NavigationService,
          useValue: navigationServiceSpy,
        },
        {
          provide: FavoritesService,
          useValue: favoritesServiceSpy,
        },
        {
          provide: RouterState,
          useValue: routerStateSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
        {
          provide: PhotosService,
          useValue: photosServiceSpy,
        },
      ],
    });

    router = TestBed.inject(Router);
    activatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routerStateSnapshot = TestBed.inject(RouterState).snapshot;
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  describe('resolve', () => {
    it('should call NavigationService.goToHome if no id', () => {
      activatedRouteSnapshot = { paramMap: convertToParamMap({}) } as ActivatedRouteSnapshot;

      executeResolver(activatedRouteSnapshot, routerStateSnapshot);

      expect(navigationServiceSpy.goToHome).toHaveBeenCalled();
    });

    it('should call NavigationService.goToHome if no favorite', () => {
      favoritesServiceSpy.getFavorite.and.returnValue(undefined);

      executeResolver(activatedRouteSnapshot, routerStateSnapshot);

      expect(navigationServiceSpy.goToHome).toHaveBeenCalled();
    });

    it('should call PhotosService.getPhotoDetails if favorite found', () => {
      const favorite = { id: '123' } as Photo;
      favoritesServiceSpy.getFavorite.and.returnValue(favorite);

      executeResolver(activatedRouteSnapshot, routerStateSnapshot);

      expect(photosServiceSpy.getPhotoDetails).toHaveBeenCalledWith(favorite.id);
    });
  });
});
