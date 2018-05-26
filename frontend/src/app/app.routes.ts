import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guards';
import {UserTableComponent} from './user-browser/user-table/user-table.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'users',      component: UserTableComponent, canActivate: [AuthGuard] },
];
