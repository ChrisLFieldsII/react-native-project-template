import { Command, Flags } from '@oclif/core';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import klaw from 'klaw';

export default class GenerateScreenModule extends Command {
  static description = 'describe the command here';

  static examples = ['<%= config.bin %> <%= command.id %>'];

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
      path.join(__dirname, '../../../../src/modules/home'),
    );
    /** regex for template to change based on module name */
    const regex = /(H|h)ome/g;
    /** path where new module will be */
    const rootModulePath = path.resolve(
      path.join(__dirname, '../../../../src/modules', moduleNameLower),
    );

    // fs.mkdirSync(rootModulePath, { recursive: true });

    const templatePaths = await new Promise<string[]>((resolve, reject) => {
      const paths: string[] = [];

      klaw(rootTemplatePath)
        .on(
          'data',
          (item) => item.path !== rootTemplatePath && paths.push(item.path),
        )
        .on('error', (err) => reject(err))
        .on('end', () => resolve(paths));
    });

    this.log(JSON.stringify(templatePaths, null, 2));

    const promises = templatePaths.map(async (currPath) => {
      const isFile = currPath.includes('.');
      // rename file contents
      if (isFile) {
        const template = await fs.readFile(currPath, { encoding: 'utf8' });
        const newContents = template
          .replace(/home/g, moduleNameLower)
          .replace(/Home/g, moduleNamePascal);
        // this.log(newContents);
      }

      // rename dir name
      else {
        const newPath = currPath
          .replace(/home/g, moduleNameLower)
          .replace(/Home/g, moduleNamePascal);
        this.log(newPath);
      }
      return currPath.replace(regex, moduleNameLower);
    });
    const results = await Promise.all(promises);
    // this.log(JSON.stringify(results, null, 2));
  }
}
