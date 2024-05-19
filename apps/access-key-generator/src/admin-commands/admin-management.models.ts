export type GenerateKeyCommandInputOptions = {
  username: string;
  level: UserAccessType;
  rateLimit: number;
  expiry: Date;
};

export enum UserAccessType {
  ADMIN,
  LIMITED,
}
