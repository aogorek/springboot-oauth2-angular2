import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {RoleService} from '../../services/role.service';
import {Role} from '../../models/role';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})

export class EditDialogComponent {

  userForm = new FormGroup({
    firstNameFormControl: new FormControl('', [Validators.required]),
    lastNameFormControl: new FormControl('', [Validators.required]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    roleFormControl: new FormControl('', [Validators.required])
  });

  matcher = new MyErrorStateMatcher();
  roles: Role[];

  constructor(
    public roleService: RoleService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.roleService.getAll().subscribe(roles => {
      this.roles = roles;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareRoles(r1: Role, r2: Role) {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;

  }
}
