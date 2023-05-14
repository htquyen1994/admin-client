export interface ITokenService {
  storeAccessToken(token: string): void;
  storeRefreshToken(token: string): void;
  getAccessToken(): any;
  getRefreshToken(): any;
  deleteAccessToken(): void;
  deleteRefreshToken(): void;
}
