import { Module } from '@nestjs/common';
import { TokenInformationController } from './token-information.controller';
import { TokenInformationService } from './token-information.service';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [TokenInformationController],
  providers: [TokenInformationService],
})
export class TokenInformationModule {}
