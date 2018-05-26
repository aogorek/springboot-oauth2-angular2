import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatSortModule,


} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from  '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {UserBrowserModule} from './user-browser/user-browser.module';
import { AlertComponent } from './directives/index';
import { AuthGuard } from './guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './helpers/index';
import { AlertService, AuthenticationService, UserService } from './services/index';
import {RoleService} from './services/role.service';
import {BroadcastService} from "./services/broadcast.service";

@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatInputModule,
    UserBrowserModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    RoleService,
    BroadcastService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
