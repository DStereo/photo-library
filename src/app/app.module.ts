import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderModule } from './core/header/header.module';
import { AppRoutingModule } from './app-routing.module';

import { WINDOW_PROVIDER } from './core/window/window.token';
import { STORAGE_KEY_PROVIDER } from './core/storage/storage.token';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HeaderModule],
  providers: [WINDOW_PROVIDER, STORAGE_KEY_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
