import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenService } from 'src/app/core/services/implementations/token.service';
import { HttpService } from '../services/http.service';
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  refresh = false;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private httpService: HttpService
  ) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) {
      const req = request.clone({
        setHeaders: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401 && !this.refresh) {
            this.refresh = true;
            const refreshToken = this.tokenService.getRefreshToken();
            return this.httpService
              .post('auth/refresh_token', { token: refreshToken })
              .pipe(
                switchMap((res: any) => {
                  const newAccessToken = res.accessToken;
                  this.tokenService.storeAccessToken(newAccessToken);
                  return next.handle(
                    request.clone({
                      setHeaders: {
                        Authorization: `Bearer ${newAccessToken}`,
                      },
                    })
                  );
                })
              ) as Observable<HttpEvent<any>>;
          }
          this.refresh = false;
          return throwError(() => err);
        })
      );
    }
    return next.handle(request);
  }
}
