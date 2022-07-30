import { Command, Flags } from '@oclif/core';
import getTemplator from 'lodash/template';
import * as path from 'node:path';
import * as fs from 'node:fs';
import klaw from 'klaw';
import { pascalCase } from '../../utils';

// const compiled = template()

export default class GenerateComponent extends Command {
  static description =
    'generate a component. MUST be run from root dir. `path` arg is relative to root dir.';

  static examples = [
    'cli generate component HomeHeader src/modules/home/components',
  ];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  };

  static args = [
    { name: 'name', required: true, description: 'name of the component' },
    {
      name: 'path',
      required: true,
      description: 'path to create the component at',
    },
  ];

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(GenerateComponent);
    const componentName = pascalCase(args.name);
    const { path: desiredPath } = args;

    const rootTemplatePath = path.resolve(
      path.join(__dirname, '../../../../templates/component'),
    );

    const templatePaths = await new Promise<string[]>((resolve, reject) => {
      const paths: string[] = [];

      klaw(rootTemplatePath)
        .on(
          'data',
          (item) => item.path !== rootTemplatePath && paths.push(item.path), //.replace('templates', 'src/modules')
        )
        .on('error', (err) => reject(err))
        .on('end', () => resolve(paths));
    });

    const componentRootPath = path.resolve(
      path.join(__dirname, '../../../../', desiredPath, componentName),
    );
    fs.mkdirSync(componentRootPath, { recursive: true });

    templatePaths.forEach((currPath) => {
      const template = fs.readFileSync(currPath, { encoding: 'utf8' });
      const templator = getTemplator(template);
      const newContents = templator({ Component: componentName });
      // this.log(newContents);

      const filename = currPath
        .slice(currPath.lastIndexOf('/') + 1)
        .replace('Component', componentName)
        .replace('.template', '');

      const componentPath = componentRootPath + `/${filename}`;

      fs.writeFileSync(componentPath, newContents);
      // fs.writeFileSync(thePath, newContents);
    });
  }
}
