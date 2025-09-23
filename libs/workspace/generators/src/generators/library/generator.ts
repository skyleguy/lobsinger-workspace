import { UnitTestRunner, libraryGenerator as ngLibraryGenerator } from '@nx/angular/generators';
import { Tree } from '@nx/devkit';
import { LinterType } from '@nx/eslint';
import { libraryGenerator } from '@nx/js';

import { LibraryGeneratorSchema } from './schema';

export async function workspaceLibraryGenerator(tree: Tree, options: LibraryGeneratorSchema) {
  const { name, application, scope, libTypes } = options;
  await Promise.all(
    libTypes.map(async (libType) => {
      const directory = `libs/${scope}/${application !== 'null' ? `/${application}` : ''}/${name}/${libType}`;
      const projectName = `${scope}-${application}-${name}-${libType}`;
      const dashSeparatedName = `${application}-${name}-${libType}`;
      const tags = `scope:${scope}, type:${libType}`;
      const linter: LinterType = 'eslint';

      switch (libType) {
        case 'feature':
        case 'ui':
        case 'data-access':
          // https://nx.dev/nx-api/angular/generators/library
          return ngLibraryGenerator(tree, {
            name: projectName,
            importPath: `@lob/${projectName}`,
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
