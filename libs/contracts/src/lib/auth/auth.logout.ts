export namespace AuthLogout {
  export const route = '/api/auth/logout';

  export interface IRequest {}

  export interface IResponse {
    message: string;
  }
}
