export namespace AuthRefreshTokens {
  export const route = '/api/auth/refresh-tokens';

  export interface IRequest {}

  export interface IResponse {
    accessToken: string;
  }
}
