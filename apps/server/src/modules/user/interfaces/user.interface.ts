export interface IUser {
  password: string;
  email: string;
  salt: Buffer;
}
