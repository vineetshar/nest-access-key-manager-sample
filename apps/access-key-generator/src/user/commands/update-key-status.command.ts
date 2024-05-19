import { Command, CommandRunner, Option } from 'nest-commander';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateAccessKeyStatusCommandInputOptions } from '../user-commands.models';

@Command({
  name: 'update-key-status',
  options: {
    isDefault: false,
  },
})
export class UpdateAccessKeyStatusCommand extends CommandRunner {
  @Option({
    flags: '-k, --key [string]',
    description: 'Key that you want to update status of',
  })
  parseKeyId(val: string): string {
    return val;
  }

  @Option({
    flags: '-s, --status [boolean]',
    description:
      'The status you want to assign to the access key. Enabled/e means that the key can be used for programmatic calls to services, while disabled/d means that the key cannot be used.',
  })
  parseKeyStatus(val: string): boolean {
    if (val.toLowerCase() === 'enabled' || val === 'e') {
      return true;
    } else if (val.toLowerCase() === 'disabled' || val === 'd') {
      return false;
    } else {
      throw new Error('Invalid status');
    }
  }

  async run(
    passedParams: string[],
    options: UpdateAccessKeyStatusCommandInputOptions,
  ): Promise<void> {
    console.log(options);
    if (!options.key) {
      throw new Error('Key is required');
    }
    if (options.status === undefined) {
      throw new Error('Status is required');
    }
    const prismaClient = new PrismaService();

    try {
      await prismaClient.userAccessKey.update({
        data: {
          enabled: options.status,
        },
        where: {
          id: options.key,
        },
      });
      console.log(
        'Key',
        options.status ? 'enabled' : 'disabled',
        'successfully',
      );
    } catch (e) {
      console.error('Error updating key status', e);
    }
  }
}
