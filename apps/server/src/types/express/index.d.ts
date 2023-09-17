import { REQUEST_USER_KEY } from '../../modules/auth/auth.constants';
import { IAccessTokenPayload } from '../../modules/auth/interfaces/access-token-payload.interface';

declare global {
  namespace Express {
    export interface Request {
      [REQUEST_USER_KEY]?: IAccessTokenPayload;
    }
  }
}

export {};
