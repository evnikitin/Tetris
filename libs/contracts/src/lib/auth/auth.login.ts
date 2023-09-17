export namespace AuthLogin {
  export const route = '/api/auth/login';

  export interface IRequest {
    email: string;
    password: string;
  }

  export interface IResponse {
    accessToken: string;
  }
}
