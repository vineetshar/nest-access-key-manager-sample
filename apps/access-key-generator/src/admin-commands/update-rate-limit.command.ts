import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'update-rate-limit',
  options: {
    isDefault: false,
  },
})
export class UpdateRateLimitCommand extends CommandRunner {
  async run(): Promise<void> {
    console.log('Key generated');
  }
}
