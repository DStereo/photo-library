import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { PhotoDetailsRoutingModule } from './photo-details-routing.module';

import { PhotoDetailsComponent } from './photo-details.component';

@NgModule({
  declarations: [PhotoDetailsComponent],
  imports: [CommonModule, MatButtonModule, PhotoDetailsRoutingModule],
})
export class PhotoDetailsModule {}
