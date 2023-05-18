import { Observable } from 'rxjs';
import { LoginResultViewModel } from 'src/app/shares/view-models/login-result.view-model';
import { LoginViewModel } from 'src/app/shares/view-models/login.view-model';
export interface IAuthenticationService {
  login(model: LoginViewModel): Observable<LoginResultViewModel>;

  logOut(refreshToken: string): Observable<any>;

  redirectToLoginPageUrl(): Observable<boolean>;
}
