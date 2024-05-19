import { Command, CommandRunner, Option } from 'nest-commander';
import { PrismaService } from '../prisma/prisma.service';
import { DeleteKeyCommandInputOptions } from './admin-management.models';

@Command({
  name: 'delete-key',
  options: {
    isDefault: false,
  },
})
export class DeleteKeyCommand extends CommandRunner {
  @Option({
    flags: '-kid, --key-id [string]',
    description: 'Key id of key you want to delete',
  })
  parseKeyId(val: string): string {
    return val;
  }
  async run(
    passedParams: string[],
    options: DeleteKeyCommandInputOptions,
  ): Promise<void> {
    const prismaClient = new PrismaService();
    console.log('got', options);
    if (!options.keyId) {
      throw new Error('Key id is required');
    }
    const deleted = await prismaClient.userAccessKey.delete({
      where: {
        id: options.keyId,
      },
    });
    console.log('Key Deleted', deleted);
  }
}
