import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';

import { FavoritesService } from '@shared/favorites/favorites.service';
import { NavigationService } from '@shared/navigation/navigation.service';

import { PhotoDetailsComponent } from './photo-details.component';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
