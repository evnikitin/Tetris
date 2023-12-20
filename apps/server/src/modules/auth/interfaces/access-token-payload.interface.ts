import { Role } from '../../../enums';

export interface IAccessTokenPayload {
  sub: string;
  role: Role;
}
