import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Page {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'glist-layout-feature-sidebar',
  templateUrl: './glist-sidebar.component.html',
  styleUrls: ['./glist-sidebar.component.scss']
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
