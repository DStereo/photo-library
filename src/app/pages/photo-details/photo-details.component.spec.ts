import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';

import { FavoritesService } from '@shared/favorites/favorites.service';
import { NavigationService } from '@shared/navigation/navigation.service';

import { PhotoDetailsComponent } from './photo-details.component';

import { Photo } from '@shared/photos/photos.model';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      data: of({
        photo: {
          id: '1',
          author: 'author',
          url: 'url',
          download_url: 'download_url',
          width: 300,
          height: 300,
        },
      }),
    });
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['removeFromFavorites']);
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['goToHome']);

    await TestBed.configureTestingModule({
      declarations: [PhotoDetailsComponent],
      imports: [RouterTestingModule, MatCardModule],
      providers: [
        {
          provide: FavoritesService,
          useValue: favoritesServiceSpy,
        },
        {
          provide: NavigationService,
          useValue: navigationServiceSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set photo from activatedRoute.data', fakeAsync(() => {
      const photo: Photo = {
        id: '1',
        author: 'author',
        url: 'url',
        download_url: 'download_url',
        width: 300,
        height: 300,
      };

      fixture.detectChanges();

      const sub = activatedRouteSpy.data.subscribe();

      tick();

      expect(component.photo).toEqual(photo);

      sub.unsubscribe();
    }));
  });

  describe('removeFromFavorites', () => {
    it('should call removeFromFavorites from FavoritesService', () => {
      const id = '1';

      component.removeFromFavorites(id);

      expect(favoritesServiceSpy.removeFromFavorites).toHaveBeenCalledWith(id);
      expect(navigationServiceSpy.goToHome).toHaveBeenCalled();
    });
  });
});
