import { Module } from '@nestjs/common';
import { AdminKeyManagementModule } from './admin-commands/admin-key-management-commands.module';

@Module({
  imports: [AdminKeyManagementModule],
})
export class AppModule {}
