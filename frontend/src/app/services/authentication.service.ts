import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authImplicitFlowConfig} from './auth.config';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private oauthService: OAuthService) {
    console.log("AUTH CONSTRUCTOR");
    this.configureOauthApi();
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.tryLogin({});
  }

  private configureOauthApi() {
    this.oauthService.configure(authImplicitFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  loadUserDetails() {
    this.oauthService.loadUserProfile();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  get fullName() {
    return this.getClaimEntry('full_name');
  }

  firstName() {
    return this.getClaimEntry('first_name');
  }

  isLoggedIn() {
    if (this.oauthService.getAccessToken() === null) {
      return false;
    }
    return true;
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  private getClaimEntry(entry) {
    var claims = this.oauthService.getIdentityClaims();

    if (!claims) {
      this.oauthService.loadUserProfile();
    } else {
      return claims[entry];
    }
  }

}
