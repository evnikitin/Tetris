export namespace AuthRegister {
  export const route = '/api/auth/register';

  export interface IRequest {
    email: string;
    password: string;
  }

  export interface IResponse {
    accessToken: string;
  }
}
