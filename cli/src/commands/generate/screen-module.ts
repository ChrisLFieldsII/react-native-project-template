import { Command, Flags } from '@oclif/core';
import * as path from 'node:path';
import * as fs from 'node:fs';

export default class GenerateScreenModule extends Command {
  static description = 'describe the command here';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  };

  static args = [{ name: 'file' }];

  public async run(): Promise<void> {
    const templatePath = path.resolve(
      path.join(__dirname, '../../../../src/modules/home'),
    );
    this.log(fs.existsSync(templatePath) + '');
  }
}
