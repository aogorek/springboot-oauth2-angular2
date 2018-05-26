import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {BroadcastService} from "../services/broadcast.service";
import {AuthenticationService} from "../services";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              public broadcastService: BroadcastService,
              private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // extract error message from http body if an error occurs
    return next.handle(request).do(event => {
    }, err => {
      console.log("HTTP ERROR " + err.status);
      if (this.router.url !== '/login' && err.status === 401) {
        this.authenticationService.logout();
        window.location.href = window.location.origin + '/logout';
      };
      if (this.router.url !== '/login' && err.status === 403) {
        console.log("Access denied");
        this.broadcastService.httpError.next("No access to selected option. Contact administrator");
      };
         return Observable.throw(err.error)
    });

  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};

