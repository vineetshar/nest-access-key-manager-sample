/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class TokenInformationService {
  constructor(private prisma: PrismaService) {}

  async getTokenInformation(accessKey: string): Promise<string> {
    const sharedSecret = '1234';
    const generatedKey = accessKey;
    const signature = crypto
      .createHmac('sha256', sharedSecret)
      .update(generatedKey)
      .digest('hex');

    const key = await this.prisma.userAccessKey.findFirstOrThrow({
      where: {
        hash: signature,
      },
    });

    if (key.usedlimit === key.ratelimit) {
      throw new BadRequestException('API Key limit exceeded');
    }
    if (!key.enabled) {
      throw new BadRequestException('API Key not active');
    }
    if (!key.enabled) {
      throw new BadRequestException('API Key not active');
    }
    if (key.expiry < new Date()) {
      throw new BadRequestException('API Key has expired');
    }

    await this.prisma.userAccessKey.update({
      where: {
        id: key.id,
      },
      data: {
        usedlimit: key.usedlimit + 1,
      },
    });
    return { 'rate limit': key.ratelimit } as unknown as string;
  }
}
