import { defineConfig } from 'astro/config';
import * as path from 'path';
import { workspaceRoot } from '@nx/devkit';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';

const ASTRO_APP_DIR = 'apps/docs';

// https://astro.build/config
export default defineConfig({
  outDir: path.resolve(workspaceRoot, 'dist', ASTRO_APP_DIR),
  srcDir: path.resolve(workspaceRoot, ASTRO_APP_DIR, 'src'),
  publicDir: path.resolve(workspaceRoot, ASTRO_APP_DIR, 'public'),
  vite: {
    cacheDir: path.resolve(workspaceRoot, 'node_modules', '.vite'),
    ssr: {
      noExternal: ['unist-util-visit']
    }
  },
  server: {
    port: 4321
  },
  base: '/',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Lobsinger Monorepo',
      customCss: ['./src/styles/styles.css'],
      lastUpdated: true,
      logo: {
        src: '/public/favicon.png'
      },
      editLink: {
        baseUrl: 'https://github.com/skyleguy/lobsinger-workspace/tree/main/apps/docs'
      },
      sidebar: [
        {
          label: 'Docs Home',
          link: 'docs'
        },
        {
          label: 'Learning',
          autogenerate: { directory: 'docs/learning' },
          collapsed: true
        }
      ],
      plugins: [starlightImageZoom()],
      components: {
        SocialIcons: './src/components/NavigationTabs.astro'
      }
    })
  ]
});
