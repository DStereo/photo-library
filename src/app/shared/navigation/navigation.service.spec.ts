import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let router: Router;
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService],
      imports: [RouterTestingModule],
    });

    router = TestBed.inject(Router);
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('navigate', () => {
    let navigateSpy: jasmine.Spy;

    beforeEach(() => {
      navigateSpy = spyOn(router, 'navigate');
    });

    describe('goToHome', () => {
      it('should call navigate with /', () => {
        service.goToHome();

        expect(navigateSpy).toHaveBeenCalledWith(['/']);
      });
    });

    describe('goToFavorites', () => {
      it('should call navigate with /favorites', () => {
        service.goToFavorites();

        expect(navigateSpy).toHaveBeenCalledWith(['/favorites']);
      });
    });

    describe('goToDetails', () => {
      it('should call navigate with /photos/:id', () => {
        service.goToDetails('id');

        expect(navigateSpy).toHaveBeenCalledWith(['/photos', 'id']);
      });
    });
  });
});
