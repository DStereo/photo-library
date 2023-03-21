import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderModule } from '@core/header/header.module';
import { AppRoutingModule } from './app-routing.module';

import { WINDOW_PROVIDER } from '@core/window/window.token';
import { STORAGE_KEY_PROVIDER } from '@core/storage/storage.token';
import { PHOTOS_API_URL_PROVIDERS } from '@shared/photos/photos.token';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule, HeaderModule],
  providers: [WINDOW_PROVIDER, STORAGE_KEY_PROVIDER, PHOTOS_API_URL_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
