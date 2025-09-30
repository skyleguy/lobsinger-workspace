import { ProjectConfiguration, Tree, getProjects } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { workspaceLibraryGenerator } from './generator';
import { LibraryGeneratorSchema, LibraryTypes } from './schema';

describe('workspace library generator', () => {
  let tree: Tree;
  const options: LibraryGeneratorSchema = {
    application: 'glist',
    scope: 'client',
    libTypes: ['feature', 'ui', 'data', 'data-access', 'util'],
    name: 'my-cool-lib'
  };
  let projects: Map<string, ProjectConfiguration>;
  let tsConfigBase: Record<string, any>;

  beforeAll(async () => {
    tree = createTreeWithEmptyWorkspace({
      layout: 'apps-libs'
    });
    await workspaceLibraryGenerator(tree, options);
    projects = getProjects(tree);
    tsConfigBase = JSON.parse(tree.read('tsconfig.base.json').toString());
  });

  it('should have the correct number of projects', () => {
    expect(projects.size).toBe(6);
    expect(tree.exists('tsconfig.base.json')).toBeTruthy();
  });

  it.each<{
    libType: LibraryTypes;
    tags: string[];
  }>([
    {
      libType: 'ui',
      tags: ['scope:client', 'type:ui']
    },
    {
      libType: 'feature',
      tags: ['scope:client', 'type:feature']
    },
    {
      libType: 'data',
      tags: ['scope:client', 'type:data']
    },
    {
      libType: 'data-access',
      tags: ['scope:client', 'type:data-access']
    },
    {
      libType: 'util',
      tags: ['scope:client', 'type:util']
    }
  ])('should create the correct libraries with correct nx config for $libType', async ({ libType, tags }) => {
    const lib = projects.get(`client-glist-my-cool-lib-${libType}`);
    expect(lib).toBeTruthy();
    expect(lib.tags).toMatchObject(tags);
    if (libType === 'feature') {
      expect(tree.exists(`libs/client/glist/my-cool-lib/${libType}/src/lib/lib.routes.ts`)).toBeTruthy();
    } else {
      expect(tree.exists(`libs/client/glist/my-cool-lib/${libType}/src/lib/lib.routes.ts`)).not.toBeTruthy();
    }
    expect(tsConfigBase.compilerOptions.paths[`@proj/client/glist/my-cool-lib/${libType}`]).toMatchObject([
      `libs/client/glist/my-cool-lib/${libType}/src/index.ts`
    ]);
  });
});
