import { AccessKeyType } from '@prisma/client';

export type GenerateKeyCommandInputOptions = {
  username: string;
  level: AccessKeyType;
  ratelimit: number;
  expiry: Date;
};

export type DeleteKeyCommandInputOptions = {
  key: string;
};

export type UpdateKeyRateLimitCommandInputOptions = {
  key: string;
  ratelimit: number;
};

export type UpdateKeyExpiryCommandInputOptions = {
  key: string;
  expiry: Date;
};
