import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getAccessToken()}`
      }
    });
    return next.handle(request);
  }
}
