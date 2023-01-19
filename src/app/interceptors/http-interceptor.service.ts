import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {LocalUserService} from "../shared/services/localUser.service";
import {environment} from "../../environments/environment";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private localUserService: LocalUserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlReq = req.clone({
      url: environment.apiBaseUrl + req.url
    });

    if (!this.localUserService.isLoggedIn) {
      return next.handle(urlReq);
    }

    const modifiedReq = urlReq.clone({
      headers: new HttpHeaders()
        .set('content-type', 'application/json')
        .set(
          'Authorization',
          'Bearer ' + this.localUserService.localUser.token
        )
    });
    return next.handle(modifiedReq);
  }
}
