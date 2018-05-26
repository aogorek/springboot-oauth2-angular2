import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService} from '../services';
import {Router} from '@angular/router';
import {BroadcastService} from "../services/broadcast.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              public broadCastService: BroadcastService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.broadCastService.httpError.asObservable().subscribe(values => {
      this.showError(values);
    })
  }

  get isLogged() {
    return this.authenticationService.isLoggedIn();
  }

  get firstName() {
    return this.authenticationService.firstName();
  }

  logout() {
    this.authenticationService.logout();
    window.location.href = window.location.origin + '/logout';
  }

  private showError(txt: string) {
    console.log("SHOWING ERROR: "+txt);
    this.alertService.error(txt);
  }

}
