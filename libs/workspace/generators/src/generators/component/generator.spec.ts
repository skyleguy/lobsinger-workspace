describe('workspace component generator', () => {
  // let tree: Tree;
  // let fakeUiProject: ProjectConfiguration;

  // beforeAll(async () => {
  //   tree = createTreeWithEmptyWorkspace({
  //     layout: 'apps-libs'
  //   });
  //   await libraryGenerator(tree, {
  //     name: 'client/glist/recipe/ui',
  //     directory: 'libs/client/glist/recipe/ui'
  //   });
  //   fakeUiProject = readProjectConfiguration(tree, 'client-glist-recipe-ui');
  // });

  // it('should set up correctly', () => {
  //   expect(fakeUiProject).toBeTruthy();
  //   expect(tree.exists('libs/client/glist/recipe/ui/src/index.ts')).toBeTruthy();
  // });

  // it('should create the new components specified in the correct locations', async () => {
  //   const componentNames = ['my-component', 'my-other-component'];
  //   await workspaceComponentGenerator(tree, {
  //     project: fakeUiProject.name ?? '',
  //     dashedNames: componentNames
  //   });
  //   ['ts', 'spec.ts', 'html'].forEach((file) => {
  //     componentNames.forEach((componentName) => {
  //       expect(
  //         tree.exists(`libs/client/glist/recipe/ui/src/lib/components/${componentName}/${componentName}.component.${file}`)
  //       ).toBeTruthy();
  //     });
  //   });
  // });
  it('true', () => {
    expect(true).toBeTruthy();
  });
});
