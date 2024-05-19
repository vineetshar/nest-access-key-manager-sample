import { Controller, Get, Param } from '@nestjs/common';
import { TokenInformationService } from './token-information.service';

@Controller()
export class TokenInformationController {
  constructor(private readonly service: TokenInformationService) {}

  @Get('key-information/:accessKey')
  async getTokenInformation(
    @Param('accessKey') accessKey: string,
  ): Promise<string> {
    return this.service.getTokenInformation(accessKey);
  }
}
