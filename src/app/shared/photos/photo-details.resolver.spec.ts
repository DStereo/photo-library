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

import { HomeComponent } from '../../pages/home/home.component';
import { PhotoDetailsComponent } from '../../pages/photo-details/photo-details.component';

import { Photo } from './photo.model';

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

    it('should return favorite if found', () => {
      const favorite = { id: '123' } as Photo;
      favoritesServiceSpy.getFavorite.and.returnValue(favorite);

      const result = executeResolver(activatedRouteSnapshot, routerStateSnapshot);

      expect(result).toEqual(favorite);
    });
  });
});
