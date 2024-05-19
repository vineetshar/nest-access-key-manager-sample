/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TokenInformationService {
  constructor(private prisma: PrismaService) {}

  async getTokenInformation(accessKey: string): Promise<string> {
    const validateKey = await this.prisma.userAccessKey.findFirstOrThrow({
      where: {
        id: accessKey,
      },
    });

    console.log('accessKey', validateKey);
    return 'Hello World!';
  }
}
