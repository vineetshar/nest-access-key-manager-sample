import { Command, CommandRunner, Option } from 'nest-commander';
import { PrismaService } from '../../prisma/prisma.service';
import { DeleteKeyCommandInputOptions } from '../admin-key-management.models';

@Command({
  name: 'delete-key',
  options: {
    isDefault: false,
  },
})
export class DeleteKeyCommand extends CommandRunner {
  @Option({
    flags: '-k, --key [string]',
    description: 'Key that you want to delete',
  })
  parseKeyId(val: string): string {
    return val;
  }
  async run(
    passedParams: string[],
    options: DeleteKeyCommandInputOptions,
  ): Promise<void> {
    const prismaClient = new PrismaService();

    if (!options.key) {
      throw new Error('Key is required');
    }

    try {
      await prismaClient.userAccessKey.delete({
        where: {
          id: options.key,
        },
      });
      console.log('Key Deleted Succesfully');
    } catch (e) {
      console.error('Error deleting key', e);
    }
  }
}
