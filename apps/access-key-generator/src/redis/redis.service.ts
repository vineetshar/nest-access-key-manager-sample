import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {}
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<string>('REDIS_PORT') as unknown as number,
    });
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async publish(channel: string, message: any) {
    try {
      await this.client.publish(channel, JSON.stringify(message));
    } catch (e) {
      console.error(e);
    }
  }
}
