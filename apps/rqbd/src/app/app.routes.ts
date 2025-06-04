import { Route } from '@angular/router';

import { IframedPdfViewerComponent } from './components/iframed-pdf-viewer.component';
import { MainContainerComponent } from './components/main-container.component';

export const appRoutes: Route[] = [
  { path: '', component: MainContainerComponent },
  { path: 'iframe/:id', component: IframedPdfViewerComponent }
];
