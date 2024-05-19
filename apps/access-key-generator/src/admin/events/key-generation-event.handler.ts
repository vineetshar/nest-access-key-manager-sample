import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyGenerationEventHandler {
  @OnEvent('ACCESS_KEY_GENERATED')
  async handleAccessKeyGeneratedEvent(event: any) {
    console.log('event', event);
  }
}
