import { Module } from '@nestjs/common';
import { UpdateAccessKeyStatusCommand } from './commands/update-key-status.command';
import { FetchKeyDetailsCommand } from './commands/fetch-key-details.command';

@Module({
  providers: [UpdateAccessKeyStatusCommand, FetchKeyDetailsCommand],
})
export class UserCommandsModule {}
