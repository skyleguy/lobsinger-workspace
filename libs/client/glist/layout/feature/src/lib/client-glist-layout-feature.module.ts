import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LetDirective } from '@ngrx/component';

import { GlistContainerComponent } from './components/glist-container/glist-app-container.component';
import { GlistContentComponent } from './components/glist-content/glist-content.component';
import { GlistHeaderComponent } from './components/glist-header/glist-header.component';
import { GlistSidebarComponent } from './components/glist-sidebar/glist-sidebar.component';
import { GlistRoutingModule } from './glist.routing.module';

@NgModule({
  declarations: [GlistHeaderComponent, GlistContainerComponent, GlistContentComponent, GlistSidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    LetDirective,
    GlistRoutingModule
  ],
  exports: [GlistContainerComponent]
})
export class ClientGlistLayoutFeatureModule {}