import { Command, CommandRunner, Option } from 'nest-commander';
import { PrismaService } from '../../prisma/prisma.service';
import { GetKeyDetailsInputOptions } from '../user-commands.models';

@Command({
  name: 'fetch-key-details',
  options: {
    isDefault: false,
  },
})
export class FetchKeyDetailsCommand extends CommandRunner {
  @Option({
    flags: '-k, --key [string]',
    description: 'Key that you want to update status of',
  })
  parseKeyId(val: string): string {
    return val;
  }

  async run(
    passedParams: string[],
    options: GetKeyDetailsInputOptions,
  ): Promise<void> {
    console.log(options);
    if (!options.key) {
      throw new Error('Key is required');
    }

    const prismaClient = new PrismaService();

    try {
      const key = await prismaClient.userAccessKey.findUniqueOrThrow({
        where: {
          id: options.key,
        },
      });
      console.log(
        'Key is',
        key.enabled ? 'enabled' : 'disabled',
        'with rate limit',
        key.ratelimit,
        'and expires on',
        key.expiry,
      );
    } catch (e) {
      console.error('Error fetching key details', e);
    }
  }
}
