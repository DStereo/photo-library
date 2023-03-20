import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: 'photos/:id',
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
