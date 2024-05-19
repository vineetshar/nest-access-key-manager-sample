import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RedisEventToDBRecordService implements OnModuleInit {
  constructor(
    private readonly redisService: RedisService,
    private prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.redisService.subscribe('ACCESS_KEY_GENERATED', async (message) => {
      const parsedMessage = JSON.parse(message);
      await this.prisma.userAccessKey.create({
        data: {
          expiry: parsedMessage.expiry,
          ratelimit: parsedMessage.ratelimit,
          enabled: parsedMessage.enabled,
          id: parsedMessage.id,
          hash: parsedMessage.hash,
          type: parsedMessage.type,
        },
      });
    });
  }
}
