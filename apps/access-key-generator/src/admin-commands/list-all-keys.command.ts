import { Command, CommandRunner } from 'nest-commander';
import { GenerateKeyCommandInputOptions } from './admin-management.models';

@Command({
  name: 'list-all-keys',
  description: 'Lists all the available keys to admin user',
  options: {
    isDefault: false,
  },
})
export class ListAllKeysCommand extends CommandRunner {
  async run(
    passedParams: string[],
    options: GenerateKeyCommandInputOptions,
  ): Promise<void> {
    if (!options?.level) {
      console.error('Missing level');
    } else {
      console.log('Level', options.level);
    }
    console.log('Keys Listed', passedParams, options);
  }
}
