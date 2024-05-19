/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenInformationService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getTokenInformation(accessKey: string): Promise<string> {
    const sharedSecret = this.configService.get<string>('SHARED_HASH_KEY');
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

    return {
      'rate limit': key.ratelimit,
      'random api response data': 'Hello world',
    } as unknown as string;
  }
}
