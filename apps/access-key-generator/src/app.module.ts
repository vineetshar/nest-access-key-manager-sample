import { Module } from '@nestjs/common';
import { AdminKeyManagementModule } from './admin/admin-key-management-commands.module';
import { UserCommandsModule } from './user/user-commands.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [AdminKeyManagementModule, UserCommandsModule, RedisModule],
})
export class AppModule {}
