import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { InfiniteScrollModule } from '@shared/infinite-scroll/infinite-scroll.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, MatRippleModule, MatGridListModule, InfiniteScrollModule],
})
export class HomeModule {}
