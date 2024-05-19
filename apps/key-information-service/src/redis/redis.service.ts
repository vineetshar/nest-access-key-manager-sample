import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {}
  private subscriber: Redis;

  onModuleInit() {
    this.subscriber = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<string>('REDIS_PORT') as unknown as number,
    });
  }

  onModuleDestroy() {
    this.subscriber.quit();
  }

  async subscribe(channel: string, callback: (message: string) => void) {
    this.subscriber.subscribe(channel);
    this.subscriber.on('message', (channel, message) => {
      callback(message);
    });
  }
}
