import { Command, CommandRunner } from 'nest-commander';
import { PrismaService } from '../prisma/prisma.service';

@Command({
  name: 'list-all-keys',
  description: 'Lists all the available keys to admin user',
  options: {
    isDefault: false,
  },
})
export class ListAllKeysCommand extends CommandRunner {
  async run(): Promise<void> {
    const prismaClient = new PrismaService();
    const allKeys = (await prismaClient.userAccessKey.findMany()).map((key) => {
      return {
        id: key.id,
        type: key.type,
        expiry: key.expiry,
        limit: key.ratelimit,
      };
    });
    console.log(allKeys);
  }
}
