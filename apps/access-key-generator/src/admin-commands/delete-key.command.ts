import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'delete-key',
  options: {
    isDefault: false,
  },
})
export class DeleteKeyCommand extends CommandRunner {
  async run(): Promise<void> {
    console.log('Key Deleted');
  }
}
