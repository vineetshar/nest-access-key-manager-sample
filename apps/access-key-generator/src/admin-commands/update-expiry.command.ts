import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'update-expiry',
  options: {
    isDefault: false,
  },
})
export class UpdateExpiryCommand extends CommandRunner {
  async run(): Promise<void> {
    console.log('Key generated');
  }
}
