import { Command, CommandRunner, Option } from 'nest-commander';
import { UserAccessType } from './admin-management.models';

@Command({
  name: 'generate-key',
  options: {
    isDefault: false,
  },
})
export class GenerateKeyCommand extends CommandRunner {
  @Option({
    flags: '-l, --level [string]',
    description:
      'Level defines what level of access this key can hold, can either be admin or limited, only admin has access to delete other keys',
  })
  parseLevel(val: string): UserAccessType {
    if (val == 'admin' || val == 'ADMIN') {
      return UserAccessType.ADMIN;
    } else if (val == 'limited' || val == 'LIMITED') {
      return UserAccessType.LIMITED;
    } else {
      throw new Error('Invalid level');
    }
  }
  async run(): Promise<void> {
    console.log('Key generated');
  }
}
