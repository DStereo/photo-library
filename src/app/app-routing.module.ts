import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { photosResolver } from './shared/images/photos-resolver';
import { photoDetailsResolver } from './shared/images/photo-details.resolver';

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
      image: photoDetailsResolver,
    },
    loadChildren: () => import('./pages/photo-details/photo-details.module').then((m) => m.PhotoDetailsModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
