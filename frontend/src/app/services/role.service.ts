import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {baseApiUrl} from '../../environments/environment';
import {Role} from '../models/role';

@Injectable()
export class RoleService {
  constructor(private http: HttpClient,
              ) {
  }

  getAll() {
    return this.http.get<Role[]>(baseApiUrl + '/rest/roles/all');
  }

}
