import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { photosResolver } from '@shared/photos/photos-resolver';
import { photoDetailsResolver } from '@shared/photos/photo-details.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    resolve: {
      photos: photosResolver,
    },
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: 'photos/:id',
    resolve: {
      photo: photoDetailsResolver,
    },
    loadChildren: () => import('./pages/photo-details/photo-details.module').then((m) => m.PhotoDetailsModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
