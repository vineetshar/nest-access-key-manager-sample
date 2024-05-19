import { Module } from '@nestjs/common';
import { ListAllKeysCommand } from './commands/list-all-keys.command';
import { GenerateKeyCommand } from './commands/generate-key.command';
import { DeleteKeyCommand } from './commands/delete-key.command';
import { UpdateExpiryCommand } from './commands/update-expiry.command';
import { UpdateRateLimitCommand } from './commands/update-rate-limit.command';
import { RedisModule } from '../redis/redis.module';
@Module({
  providers: [
    GenerateKeyCommand,
    ListAllKeysCommand,
    UpdateExpiryCommand,
    UpdateRateLimitCommand,
    DeleteKeyCommand,
  ],
  imports: [RedisModule],
})
export class AdminKeyManagementModule {}
