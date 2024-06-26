import { Command, CommandRunner, Option } from 'nest-commander';
import { GenerateKeyCommandInputOptions } from '../admin-key-management.models';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { AccessKeyType } from '@prisma/client';
import { RedisService } from '../../redis/redis.service';
import { ConfigService } from '@nestjs/config';
@Command({
  name: 'generate-key',
  options: {
    isDefault: false,
  },
})
export class GenerateKeyCommand extends CommandRunner {
  constructor(
    private readonly redisService: RedisService,
    private configService: ConfigService,
  ) {
    super();
  }

  @Option({
    flags: '-l, --level [string]',
    description:
      'Level defines what level of access this key can hold, can either be admin or limited, only admin has access to delete other keys',
  })
  parseLevel(val: string): AccessKeyType {
    if (val == 'admin' || val == 'ADMIN') {
      return AccessKeyType.ADMIN;
    } else if (val == 'limited' || val == 'LIMITED') {
      return AccessKeyType.LIMITED;
    } else {
      throw new Error('Invalid level');
    }
  }

  @Option({
    flags: '-u, --username [string]',
    description: 'username of the person who is generating the key',
  })
  parseUsername(val: string): string {
    return val;
  }

  @Option({
    flags: '-r, --ratelimit [number]',
    description: 'Rate limit for the generated key',
  })
  parseRateLimit(val: string): number {
    const rateLimit = parseInt(val);
    if (isNaN(rateLimit) || rateLimit <= 0) {
      throw new Error('Invalid rate limit');
    }
    return rateLimit;
  }

  @Option({
    flags: '-e, --expiry [Date]',
    description: 'Expiry time for the generated key in DD-MM-YYYY format',
  })
  parseExpiry(val: string): Date {
    const expiry = new Date(val);
    if (isNaN(expiry.getUTCDate())) {
      throw new Error('Invalid expiry');
    }
    return expiry;
  }

  async run(
    passedParams: string[],
    options: GenerateKeyCommandInputOptions,
  ): Promise<void> {
    const prismaClient = new PrismaService();
    const sharedSecret = this.configService.get<string>('SHARED_HASH_KEY');

    if (options.level == undefined) {
      throw new Error('Level is required');
    }
    if (!options.username) {
      throw new Error('Username is required');
    }
    if (!options.ratelimit) {
      throw new Error('Rate limit is required');
    }
    if (!options.expiry) {
      throw new Error('Expiry is required');
    }

    const generatedKey = uuidv4();
    const signature = crypto
      .createHmac('sha256', sharedSecret)
      .update(generatedKey)
      .digest('hex');

    try {
      const key = await prismaClient.userAccessKey.create({
        data: {
          hash: signature,
          expiry: options.expiry,
          type: options.level,
          ratelimit: options.ratelimit,
        },
      });

      this.redisService.publish('ACCESS_KEY_GENERATED', key);
      console.log('Generated Access Key is ', generatedKey);
    } catch (error) {
      console.log('error', error);
    }
  }
}
// UserAccessKey
