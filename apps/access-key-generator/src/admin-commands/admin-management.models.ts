import { AccessKeyType } from '@prisma/client';

export type GenerateKeyCommandInputOptions = {
  username: string;
  level: AccessKeyType;
  ratelimit: number;
  expiry: Date;
};

export type DeleteKeyCommandInputOptions = {
  keyId: string;
};
