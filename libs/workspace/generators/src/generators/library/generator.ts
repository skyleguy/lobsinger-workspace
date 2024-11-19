import { UnitTestRunner, libraryGenerator as ngLibraryGenerator } from '@nx/angular/generators';
import { Tree } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { libraryGenerator } from '@nx/js';

import { LibraryGeneratorSchema } from './schema';

export async function workspaceLibraryGenerator(tree: Tree, options: LibraryGeneratorSchema) {
  await Promise.all(
    options.libTypes.map(async (libType) => {
      const name = `${options.scope}/${options.application}/${options.name}/${libType}`;
      const directory = `libs/${name}`;
      const dashSeparatedName = `${options.application}-${options.name}-${libType}`;
      const tags = `scope:client, type:${libType}`;
      const linter = Linter.EsLint;

      switch (libType) {
        case 'feature':
        case 'ui':
        case 'widget':
        case 'data-access':
          // https://nx.dev/nx-api/angular/generators/library
          return ngLibraryGenerator(tree, {
            name,
            buildable: false,
            changeDetection: 'OnPush',
            lazy: libType === 'feature',
            routing: libType === 'feature',
            linter,
            publishable: false,
            selector: dashSeparatedName,
            prefix: dashSeparatedName,
            standalone: true,
            strict: true,
            style: 'scss',
            tags,
            unitTestRunner: UnitTestRunner.Jest,
            directory
          });
        default:
          // https://nx.dev/nx-api/js/generators/library#nxjslibrary
          return libraryGenerator(tree, {
            name,
            buildable: false,
            bundler: 'esbuild',
            compiler: 'tsc',
            config: 'workspace',
            js: false,
            publishable: false,
            unitTestRunner: 'jest',
            tags,
            linter,
            strict: true,
            directory
          });
      }
    })
  );
}

export default workspaceLibraryGenerator;
