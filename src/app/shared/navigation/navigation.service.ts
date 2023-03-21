import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  goToHome(): Promise<boolean> {
    return this.router.navigate(['/']);
  }

  goToFavorites(): Promise<boolean> {
    return this.router.navigate(['/favorites']);
  }

  goToDetails(id: string): Promise<boolean> {
    return this.router.navigate(['/photos', id]);
  }
}
