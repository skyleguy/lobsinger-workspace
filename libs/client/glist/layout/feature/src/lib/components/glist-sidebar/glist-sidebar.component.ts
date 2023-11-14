import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';

interface Page {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'glist-layout-feature-sidebar',
  templateUrl: './glist-sidebar.component.html',
  styleUrls: ['./glist-sidebar.component.scss'],
  standalone: true,
  imports: [MatListModule, RouterLink, MatIconModule]
})
export class GlistSidebarComponent {
  readonly pages: Page[] = [
    { title: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    { title: 'Current Glist', icon: 'list', route: 'glists' },
    { title: 'Recipes', icon: 'topic', route: 'recipes' },
    { title: 'Menus', icon: 'menu_book', route: 'menus' }
  ];

  constructor(public router: Router) {}
}
