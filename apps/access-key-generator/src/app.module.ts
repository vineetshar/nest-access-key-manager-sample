import { Module } from '@nestjs/common';
import { AdminKeyManagementModule } from './admin/admin-key-management-commands.module';
import { UserCommandsModule } from './user/user-commands.module';

@Module({
  imports: [AdminKeyManagementModule, UserCommandsModule],
})
export class AppModule {}
