import { Module } from '@nestjs/common';
import { ListAllKeysCommand } from './list-all-keys.command';
import { GenerateKeyCommand } from './generate-key.command';
import { DeleteKeyCommand } from './delete-key.command';
import { UpdateExpiryCommand } from './update-expiry.command';
import { UpdateRateLimitCommand } from './update-rate-limit.command';

@Module({
  providers: [
    GenerateKeyCommand,
    ListAllKeysCommand,
    UpdateExpiryCommand,
    UpdateRateLimitCommand,
    DeleteKeyCommand,
  ],
})
export class AdminKeyManagementModule {}
