import { Observable } from 'rxjs';
import { LoginResultViewModel } from 'src/view-models/login-result.view-model';
import { LoginViewModel } from 'src/view-models/login.view-model';
export interface IAuthenticationService {
  login(model: LoginViewModel): Observable<LoginResultViewModel>;

  logOut(refreshToken: string): Observable<any>;

  redirectToLoginPageUrl(): Observable<boolean>;
}
