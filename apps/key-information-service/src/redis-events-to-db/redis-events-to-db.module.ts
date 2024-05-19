import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { RedisEventToDBRecordService } from './redis-event-to-db-record.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [RedisModule, PrismaModule],
  providers: [RedisEventToDBRecordService],
})
export class RedisEventsToDbModule {}
