import { Command, Flags } from '@oclif/core';
import * as path from 'node:path';
import * as fs from 'node:fs';
import klaw from 'klaw';

export default class GenerateScreenModule extends Command {
  static description = 'generate a new module';

  static examples = ['cli generate home'];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  };

  static args = [{ name: 'name' }];

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(GenerateScreenModule);
    const moduleNameLower = args.name.toLowerCase();
    const moduleNamePascal =
      moduleNameLower[0].toUpperCase() + moduleNameLower.slice(1);

    /** template path. dir contains files that want to copy */
    const rootTemplatePath = path.resolve(
      path.join(__dirname, '../../../../templates/home'),
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

    templatePaths.forEach((currPath) => {
      const isFile = currPath.includes('.');

      const templatePath = currPath
        .replace(/home/g, moduleNameLower)
        .replace(/Home/g, moduleNamePascal);

      // rename file contents
      if (isFile) {
        const template = fs.readFileSync(currPath, { encoding: 'utf8' });
        const newContents = template
          .replace(/home/g, moduleNameLower)
          .replace(/Home/g, moduleNamePascal);

        fs.writeFileSync(
          templatePath.replace('templates', 'src/modules'),
          newContents,
        );
      }

      // rename dir name
      else {
        fs.mkdirSync(templatePath.replace('templates', 'src/modules'), {
          recursive: true,
        });
      }
    });
  }
}
