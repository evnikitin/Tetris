export interface IUser {
  name: string;
  password: string;
  email: string;
  salt: Buffer;
  timeRecord: number;
  pointsRecord: number;
}
