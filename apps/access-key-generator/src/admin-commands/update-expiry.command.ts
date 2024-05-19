import { Command, CommandRunner, Option } from 'nest-commander';
import { UpdateKeyExpiryCommandInputOptions } from './admin-management.models';
import { PrismaService } from '../prisma/prisma.service';

@Command({
  name: 'update-expiry',
  options: {
    isDefault: false,
  },
})
export class UpdateExpiryCommand extends CommandRunner {
  @Option({
    flags: '-k, --key [string]',
    description: 'Key that you want to update expiry of',
  })
  parseKeyId(val: string): string {
    return val;
  }

  @Option({
    flags: '-e, --expiry [Date]',
    description: 'New Expiry in DD-MM-YYYY format',
  })
  parseNewExpiry(val: string): Date {
    return new Date(val);
  }

  async run(
    passedParams: string[],
    options: UpdateKeyExpiryCommandInputOptions,
  ): Promise<void> {
    if (!options.key) {
      throw new Error('Key is required');
    }
    if (!options.expiry) {
      throw new Error('Expiry is required');
    }
    const prismaClient = new PrismaService();

    try {
      await prismaClient.userAccessKey.update({
        data: {
          expiry: options.expiry,
        },
        where: {
          id: options.key,
        },
      });
      console.log('Expiry updated');
    } catch (e) {
      console.error('Error updating expiry', e);
    }
  }
}
