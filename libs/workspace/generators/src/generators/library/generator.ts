import { UnitTestRunner, libraryGenerator as ngLibraryGenerator } from '@nx/angular/generators';
import { Tree } from '@nx/devkit';
import { LinterType } from '@nx/eslint';
import { libraryGenerator } from '@nx/js';

import { LibraryGeneratorSchema } from './schema';

export async function workspaceLibraryGenerator(tree: Tree, options: LibraryGeneratorSchema) {
  await Promise.all(
    options.libTypes.map(async (libType) => {
      let name = options.scope;
      if (options.application && options.application !== 'null') {
        name += `/${options.application}`;
      }
      name += `/${options.name}/${libType}`;
      const directory = `libs/${name}`;
      const dashSeparatedName = `${options.application}-${options.name}-${libType}`;
      const tags = `scope:${options.scope}, type:${libType}`;
      const linter: LinterType = 'eslint';

      switch (libType) {
        case 'feature':
        case 'ui':
        case 'data-access':
          // https://nx.dev/nx-api/angular/generators/library
          return ngLibraryGenerator(tree, {
            name,
            importPath: `@lob/${name}`,
            buildable: libType === 'ui',
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
            importPath: `@lob/${name}`,
            buildable: true,
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
