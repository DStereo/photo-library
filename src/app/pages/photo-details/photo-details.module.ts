import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PhotoDetailsRoutingModule } from './photo-details-routing.module';

import { PhotoDetailsComponent } from './photo-details.component';

@NgModule({
  declarations: [PhotoDetailsComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, PhotoDetailsRoutingModule],
})
export class PhotoDetailsModule {}
