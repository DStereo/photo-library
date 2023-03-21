import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { map, timer } from 'rxjs';

import { PHOTOS_CONFIG } from '@shared/photos/photos.token';
import { FavoritesService } from '@shared/favorites/favorites.service';
import { PhotosService } from '@shared/photos/photos.service';

import { InfiniteScrollModule } from '@shared/infinite-scroll/infinite-scroll.module';

import { HomeComponent } from './home.component';

import { Photo, PhotosConfig } from '@shared/photos/photos.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let activatedRouteSpy: ActivatedRoute;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let photosServiceSpy: jasmine.SpyObj<PhotosService>;
  const photosConfig: PhotosConfig = {
    apiUrl: 'url',
    apiDelay: 300,
    pageLimit: 9,
    listSize: 300,
    detailsSize: 600,
  };

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        data: {
          photos: [],
        },
      },
    });
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['addToFavorites']);
    photosServiceSpy = jasmine.createSpyObj('PhotosService', ['getPhotos']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatGridListModule, InfiniteScrollModule],
      providers: [
        {
          provide: PHOTOS_CONFIG,
          useValue: photosConfig,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
        {
          provide: FavoritesService,
          useValue: favoritesServiceSpy,
        },
        {
          provide: PhotosService,
          useValue: photosServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set photos', () => {
      const photos: Photo[] = [
        {
          id: 'id-1',
          author: 'author-1',
          width: 300,
          height: 300,
          url: 'url-1',
          download_url: 'download_url-1',
        },
        {
          id: 'id-2',
          author: 'author-2',
          width: 300,
          height: 300,
          url: 'url-2',
          download_url: 'download_url-2',
        },
      ];

      activatedRouteSpy.snapshot.data['photos'] = photos;

      component.ngOnInit();

      expect(component.photos).toEqual(photos);
    });
  });

  describe('addToFavorites', () => {
    it('should add an photo to favorites', () => {
      const photo: Photo = {
        id: 'id-1',
        author: 'author-1',
        width: 300,
        height: 300,
        url: 'url-1',
        download_url: 'download_url-1',
      };

      component.addToFavorites(photo);

      expect(favoritesServiceSpy.addToFavorites).toHaveBeenCalledWith(photo);
    });
  });

  describe('trackByFn', () => {
    it('should return id', () => {
      const id = 'id';
      const index = 0;
      const photo = {
        id,
      } as Photo;

      expect(component.trackByFn(index, photo)).toBe(id);
    });
  });

  describe('onScrollDown', () => {
    function getMockPhotos(start = 0): Photo[] {
      return Array.from({ length: photosConfig.pageLimit }).map(
        (_, index) => ({ id: (index + start).toString() } as Photo)
      );
    }

    it('should increase page', fakeAsync(() => {
      const firstPagePhotos = getMockPhotos();

      component.photos = firstPagePhotos;

      const secondPagePhotos = getMockPhotos(photosConfig.pageLimit);
      photosServiceSpy.getPhotos.and.returnValue(timer(photosConfig.apiDelay).pipe(map(() => secondPagePhotos)));

      component.onScrollDown();

      expect(component.loading).toBe(true);
      expect(photosServiceSpy.getPhotos).toHaveBeenCalledWith(1);

      tick(photosConfig.apiDelay);

      expect(component.loading).toBe(false);
      expect(component.photos).toEqual([...firstPagePhotos, ...secondPagePhotos]);

      fixture.destroy();
    }));
  });
});
