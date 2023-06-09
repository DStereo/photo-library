import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatGridListModule } from '@angular/material/grid-list';

import { FavoritesService } from '@shared/favorites/favorites.service';

import { FavoritesComponent } from './favorites.component';

import { Photo } from '@shared/photos/photos.model';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['getAllFavoritesArray']);

    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [RouterTestingModule, MatGridListModule],
      providers: [
        {
          provide: FavoritesService,
          useValue: favoritesServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set favorites', () => {
      const favorites: Photo[] = [
        {
          id: 'id-1',
          author: 'author-1',
          width: 300,
          height: 300,
          url: 'url-1',
          download_url: 'download_url-1',
        },
      ];

      favoritesServiceSpy.getAllFavoritesArray.and.returnValue(favorites);

      fixture.detectChanges();

      expect(component.favorites).toBe(favorites);
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
});
