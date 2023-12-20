export interface IPasswordHash {
  hashedPassword: string;
  salt: Buffer;
}
