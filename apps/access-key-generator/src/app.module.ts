import { Module } from '@nestjs/common';
import { AdminKeyManagementModule } from './admin/admin-key-management-commands.module';
import { UserCommandsModule } from './user/user-commands.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AdminKeyManagementModule,
    UserCommandsModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
