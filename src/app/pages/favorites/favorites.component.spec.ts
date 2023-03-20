import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesService } from '../../shared/favorites/favorites.service';

import { FavoritesComponent } from './favorites.component';

import { Image } from '../../shared/images/images.model';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', ['getFavoritesArray']);

    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
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
      const favorites: Image[] = [
        {
          id: 'id-1',
          author: 'author-1',
          width: 300,
          height: 300,
          url: 'url-1',
          download_url: 'download_url-1',
        },
      ];

      favoritesServiceSpy.getFavoritesArray.and.returnValue(favorites);

      fixture.detectChanges();

      expect(component.favorites).toBe(favorites);
    });
  });
});
