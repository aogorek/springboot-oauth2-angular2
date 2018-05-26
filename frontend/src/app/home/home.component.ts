import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    constructor(private userService: UserService) {
        // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

}
