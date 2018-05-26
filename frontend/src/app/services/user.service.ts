import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {User} from '../models/index';
import {baseApiUrl} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAll() {
    this.http.get<User[]>(baseApiUrl + '/rest/users/all').subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getById(_id: number) {
    return this.http.get<User>(baseApiUrl + '/rest/users/get/' + _id);
  }

  create(user: User) {
    return this.http.post(baseApiUrl + '/rest/users/register', user);
  }

  update(user: User) {
    return this.http.put(baseApiUrl + '/rest/users/update', user);
  }

  delete(_id: number) {
    return this.http.delete(baseApiUrl + '/rest/users/delete/' + _id);
  }

  createEmptyUser() {
    let user = new User();
    user.id = 0;
    return user;
  }
}
