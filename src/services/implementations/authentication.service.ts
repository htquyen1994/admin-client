import { Observable, from } from 'rxjs';
import { LoginResultViewModel } from 'src/view-models/login-result.view-model';
import { LoginViewModel } from 'src/view-models/login.view-model';
import { IAuthenticationService } from '../interfaces/authentication-service.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'; // sau nay sẽ set config tự động lấy url dựa theo evironment-> truoc mat dung o local
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  apiBaseUrl = `${environment.apiBaseUrl}/auth`;

  public constructor(
    private httpService: HttpService,
    private HttpClient: HttpClient,
    private router: Router
  ) {}

  login(model: LoginViewModel): Observable<LoginResultViewModel> {
    // ma hoa body
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const fullUrl = `${this.apiBaseUrl}/login`;

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', model.username);
    body.set('password', model.password);
    const _this = this;

    // minh se luu vao localstorage hay cookie
    return this.HttpClient.post<LoginResultViewModel>(
      fullUrl,
      body.toString(),
      { headers, 
        // withCredentials: true  -> se luu vao cookie dung httpOnly
      }
    );
  }

  logOut(refreshToken: string): Observable<any> {
    // clear localstorage
    localStorage.clear();

    const body = new URLSearchParams();
    body.set('refreshtoken', refreshToken);

    return this.httpService.post('auth/logout', body.toString());
  }

  public redirectToLoginPageUrl(): Observable<boolean> {
    return from(this.router.navigate(['/login']));
  }
}
