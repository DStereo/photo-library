import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeaderComponent],
  imports: [MatToolbarModule, RouterLink, RouterLinkActive, MatButtonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
