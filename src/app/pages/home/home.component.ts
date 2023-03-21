import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

import { FavoritesService } from '@shared/favorites/favorites.service';
import { PhotosService } from '@shared/photos/photos.service';
import { PHOTOS_CONFIG } from '@shared/photos/photos.token';

import { DestroyDirective } from '@shared/destroy/destroy.directive';

import { Photo, PhotosConfig } from '@shared/photos/photos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends DestroyDirective implements OnInit {
  photos: Photo[] = [];
  loading = false;

  constructor(
    @Inject(PHOTOS_CONFIG) private photosConfig: PhotosConfig,
    private activatedRoute: ActivatedRoute,
    private favoritesService: FavoritesService,
    private photosService: PhotosService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }

  addToFavorites(photo: Photo): void {
    this.favoritesService.addToFavorites(photo);
  }

  trackByFn(index: number, photo: Photo): string {
    return photo.id;
  }

  onScrollDown(): void {
    const page = this.photos.length / this.photosConfig.pageLimit;

    this.loading = true;

    this.photosService
      .getPhotos(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((photos) => {
        this.photos = [...this.photos, ...photos];
        this.loading = false;
        this.cdr.markForCheck();
      });
  }
}
