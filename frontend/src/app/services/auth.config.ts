import { AuthConfig } from 'angular-oauth2-oidc';
import {baseApiUrl} from '../../environments/environment';

export const authImplicitFlowConfig: AuthConfig = {

  // Url of the Identity Provider
  loginUrl: '/oauth/authorize',
  redirectUri: window.location.origin + '/',
  userinfoEndpoint: '/rest/users/userinfo',
  clientId: 'sampleClientId',
  scope: 'read write',
  showDebugInformation: true,
  requireHttps:false,
  logoutUrl: window.location.origin + '/logout',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  oidc: false

}
