import { RenderMode, ServerRoute } from '@angular/ssr';

import { assetRouteFragments } from './routes.const';

export const serverRoutes: ServerRoute[] = [
  {
    path: assetRouteFragments,
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
