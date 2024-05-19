import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private subscriber: Redis;

  onModuleInit() {
    this.subscriber = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  onModuleDestroy() {
    this.subscriber.quit();
  }

  async subscribe(channel: string, callback: (message: string) => void) {
    const subscriber = new Redis({
      host: 'localhost',
      port: 6379,
    });

    subscriber.subscribe(channel);
    subscriber.on('message', (channel, message) => {
      console.log('Received message:', channel, message);
      callback(message);
    });
  }
}
