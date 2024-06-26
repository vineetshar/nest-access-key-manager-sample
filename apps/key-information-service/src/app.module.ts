import { Module } from '@nestjs/common';
import { TokenInformationController } from './token-information.controller';
import { TokenInformationService } from './token-information.service';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { RedisEventsToDbModule } from './redis-events-to-db/redis-events-to-db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    RedisEventsToDbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TokenInformationController],
  providers: [TokenInformationService],
})
export class TokenInformationModule {}
