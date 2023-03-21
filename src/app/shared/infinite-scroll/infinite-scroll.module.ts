import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll.component';
import { InfiniteScrollTargetDirective } from './infinite-scroll-target.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [InfiniteScrollComponent, InfiniteScrollTargetDirective],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [InfiniteScrollComponent],
})
export class InfiniteScrollModule {}
