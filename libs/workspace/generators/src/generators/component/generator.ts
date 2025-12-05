import { componentGenerator } from '@nx/angular/generators';
import { formatFiles, generateFiles, getProjects, joinPathFragments, names, Tree } from '@nx/devkit';

import { ComponentGeneratorSchema } from './schema';

export async function workspaceComponentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
  const { dashedNames, inlineTemplate, project } = options;

  const projects = getProjects(tree);
  const ourProject = projects.get(project);

  return Promise.all(
    dashedNames.map(async (dashedName) => {
      await componentGenerator(tree, {
        name: dashedName,
        changeDetection: 'OnPush',
        standalone: true,
        style: 'none',
        path: `${ourProject?.sourceRoot}/lib/components/${dashedName}/${dashedName}`,
        type: 'component',
        inlineTemplate: inlineTemplate ?? false
      });

      const specFileTemplateReplacements = {
        componentName: names(`${dashedName}-component`).className,
        dashedName,
        tmpl: ''
      };

      generateFiles(
        tree,
        joinPathFragments(__dirname, './files'),
        `${ourProject?.sourceRoot}/lib/components/${dashedName}`,
        specFileTemplateReplacements
      );

      await formatFiles(tree);
    })
  );
}

export default workspaceComponentGenerator;
