import { Component } from '@angular/core';

interface Page {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'glist-sidebar',
  templateUrl: './glist-sidebar.component.html',
  styleUrls: ['./glist-sidebar.component.scss'],
})
export class GlistSidebarComponent {
  readonly pages: Page[] = [
    { title: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    { title: 'Current Glist', icon: 'list', route: 'glist' },
    { title: 'Recipes', icon: 'topic', route: 'recipes' },
    { title: 'Menus', icon: 'menu_book', route: 'menus' },
  ];

  selectedPage!: Page;
}
