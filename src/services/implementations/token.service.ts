import { Injectable } from '@angular/core';
import { ITokenService } from '../interfaces/token-service.interface';
import { TOKEN_TYPE } from '../../constants/token.constant';
@Injectable({
  providedIn: 'root',
})
export class TokenService implements ITokenService {
  constructor() {}
  storeAccessToken(token: string) {
    localStorage.setItem(TOKEN_TYPE.ACCESS_TOKEN, token);
  }
  storeRefreshToken(token: string) {
    localStorage.setItem(TOKEN_TYPE.REFRESH_TOKEN, token);
  }

  getAccessToken(): any {
    return localStorage.getItem(TOKEN_TYPE.ACCESS_TOKEN);
  }

  getRefreshToken(): any {
    return localStorage.getItem(TOKEN_TYPE.REFRESH_TOKEN);
  }
  deleteAccessToken = () => {
    localStorage.removeItem(TOKEN_TYPE.ACCESS_TOKEN);
  };
  deleteRefreshToken = () => {
    localStorage.removeItem(TOKEN_TYPE.REFRESH_TOKEN);
  };
}
