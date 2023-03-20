import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

import { FavoritesService } from '../../shared/favorites/favorites.service';

import { HomeComponent } from './home.component';

import { Image } from '../../shared/images/images.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let activatedRouteSpy: ActivatedRoute;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        data: {
          images: [],
        },
      },
    });
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['addToFavorites']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatGridListModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
        {
          provide: FavoritesService,
          useValue: favoritesServiceSpy,
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
    it('should set images', () => {
      const images: Image[] = [
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

      activatedRouteSpy.snapshot.data['images'] = images;

      component.ngOnInit();

      expect(component.images).toEqual(images);
    });
  });

  describe('addToFavorites', () => {
    it('should add an image to favorites', () => {
      const image: Image = {
        id: 'id-1',
        author: 'author-1',
        width: 300,
        height: 300,
        url: 'url-1',
        download_url: 'download_url-1',
      };

      component.addToFavorites(image);

      expect(favoritesServiceSpy.addToFavorites).toHaveBeenCalledWith(image);
    });
  });
});
