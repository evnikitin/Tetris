import { Role } from '../../../enums';

export interface IRefreshTokenPayload {
  sub: string;
  role: Role;
}
