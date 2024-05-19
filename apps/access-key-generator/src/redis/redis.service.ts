import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async publish(channel: string, message: any) {
    try {
      console.log('publishing message', channel, message);
      await this.client.publish(channel, JSON.stringify(message));
    } catch (e) {
      console.log(e);
    }
  }
}
