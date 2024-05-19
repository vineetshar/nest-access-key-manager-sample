import { Command, CommandRunner, Option } from 'nest-commander';
import { UpdateKeyRateLimitCommandInputOptions } from '../admin-key-management.models';
import { PrismaService } from '../../prisma/prisma.service';

@Command({
  name: 'update-rate-limit',
  options: {
    isDefault: false,
  },
})
export class UpdateRateLimitCommand extends CommandRunner {
  @Option({
    flags: '-k, --key [string]',
    description: 'The key you want to update expiry of',
  })
  parseKeyId(val: string): string {
    return val;
  }

  @Option({
    flags: '-r, --ratelimit [number]',
    description: 'Rate limit for the generated key',
  })
  parseRateLimit(val: string): number {
    const rateLimit = parseInt(val);
    if (isNaN(rateLimit) || rateLimit <= 0) {
      throw new Error('Invalid rate limit');
    }
    return rateLimit;
  }

  async run(
    passedParams: string[],
    options: UpdateKeyRateLimitCommandInputOptions,
  ): Promise<void> {
    if (!options.key) {
      throw new Error('Key is required');
    }
    if (!options.ratelimit) {
      throw new Error('Expiry is required');
    }
    const prismaClient = new PrismaService();

    try {
      await prismaClient.userAccessKey.update({
        data: {
          ratelimit: options.ratelimit,
        },
        where: {
          id: options.key,
        },
      });
      console.log('Rate limit updated');
    } catch (e) {
      console.error('Error updating rate limit', e);
    }
  }
}
