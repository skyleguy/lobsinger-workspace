import { formatFiles, generateFiles, getProjects, joinPathFragments, Tree } from '@nx/devkit';
import OpenAI from 'openai';

import { SpecGeneratorSchema } from './schema';

const specGeneratorPrompt =
  'can you generate an ngneat/spectator/jest suite for the following angular component that: mocks all dependent modules, directives, components using either ng-mocks or spectator tools sets up a beforeEach method which includes setting the spectator, passes in example values for inputs through the props field, and initializes any jest.SpyObjects we may need to use creates an it with a description of all the cases we should be testing in order to 100% test this components public api by querying the dom, passing inputs, and expecting outputs to emit with certain values. do not actually write the specs. the its should be blank. The response should be just the typescript without any explanation, but can include helpful comments within the typescript';

export async function specGenerator(tree: Tree, options: SpecGeneratorSchema) {
  const { dashedComponentName, project } = options;
  const projects = getProjects(tree);
  const ourProject = projects.get(project);
  const componentTsFileLocation = `${ourProject.sourceRoot}/lib/components/${dashedComponentName}/${dashedComponentName}.component.ts`;
  const componentHtmlFileLocation = `${ourProject.sourceRoot}/lib/components/${dashedComponentName}/${dashedComponentName}.component.html`;
  const componentTsFileText = tree.read(componentTsFileLocation)?.toString('utf8');
  const componentHtmlFileText = tree.read(componentHtmlFileLocation)?.toString('utf8');
  const generatedOutput = await getGeneratedResponse([componentTsFileText, componentHtmlFileText]);
  const specFileTemplateReplacements = {
    dashedComponentName,
    generatedOutput,
    tmpl: ''
  };

  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    `${ourProject.sourceRoot}/lib/components/${dashedComponentName}`,
    specFileTemplateReplacements
  );
  await formatFiles(tree);
}

async function getGeneratedResponse(textFromFiles: string[]) {
  const apiKey = process.env['OPEN_AI_API_KEY'];
  const openai = new OpenAI({
    apiKey
  });
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `${specGeneratorPrompt} | ${textFromFiles.join(' | ')}`
      }
    ]
  });
  return completion.choices[0].message.content;
}

export default specGenerator;
