import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {EditDialogComponent} from '../../user-browser/edit-dialog/edit-dialog.component';
import {Http} from '@angular/http';
import {DeleteDialogComponent} from '../../user-browser/delete-dialog/delete-dialog.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../services';
import {User} from '../../models';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {

  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'action'];
  userDatabase: UserService | null;
  dataSource: UserDataSource | null;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public userService: UserService,
              public http: Http,
              public snackBar: MatSnackBar) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  newUser() {
    let user = this.userDatabase.createEmptyUser();
    let dialogRef = this.dialog.open(EditDialogComponent, {
      width: '450px',
      data: {user}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data == undefined) {
        return;
      }
      this.userDatabase.create(data.user).subscribe(user => {
          this.showSnackAndRefresh('User data saved correctly.');
        },
        (error: HttpErrorResponse) => {
          this.showSnackAndRefresh('Error saving user data!!!');
        });
    });
  }

  editUser(id: number) {
    this.userDatabase.getById(id).subscribe(user => {

      let dialogRef = this.dialog.open(EditDialogComponent, {
        width: '450px',
        data: {user}
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data == undefined) {
          return;
        }
        this.userDatabase.update(data.user).subscribe(user => {
            this.showSnackAndRefresh('User data saved correctly.');
          },
          (error: HttpErrorResponse) => {
            this.showSnackAndRefresh('Error saving user data!!!');
          });
      });
    });
  }

  deleteUser(id: number) {
      let dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '450px',
        data: {id}
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data == undefined) {
          return;
        }
        this.userDatabase.delete(id).subscribe(id => {
            this.showSnackAndRefresh('User deleted.');
          },
          (error: HttpErrorResponse) => {
            this.showSnackAndRefresh('Error deleting user data');
          });
      });
  }

  private showSnackAndRefresh(snackTxt: string) {
    this.snackBar.open(snackTxt, '', {
      duration: 2500,
    });
    this.loadData();
  }

  public loadData() {
    this.userDatabase = this.userService;//new UserService(this.httpClient);
    this.dataSource = new UserDataSource(this.userDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}

export class UserDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _userDatabase: UserService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._userDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._userDatabase.getAll();

    return Observable.merge(...displayDataChanges).map(() => {
      console.log("INSIDE");
      // Filter data
      this.filteredData = this._userDatabase.data.slice().filter((User: User) => {
        const searchStr = (User.id + User.firstName + User.lastName + User.email).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() {
  }


  /** Returns a sorted copy of the database data. */
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'firstName':
          [propertyA, propertyB] = [a.firstName, b.firstName];
          break;
        case 'lastName':
          [propertyA, propertyB] = [a.lastName, b.lastName];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}
