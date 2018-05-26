import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserTableComponent } from './user-table/user-table.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatExpansionModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {BidiModule} from "@angular/cdk/bidi";
import {PlatformModule} from "@angular/cdk/platform";
import {A11yModule} from "@angular/cdk/a11y";
import {CdkTableModule} from "@angular/cdk/table";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {ObserversModule} from "@angular/cdk/observers";
import {PortalModule} from "@angular/cdk/portal";
import {ScrollDispatchModule} from "@angular/cdk/scrolling";
import {OverlayModule} from "@angular/cdk/overlay";
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {HttpModule} from "@angular/http";
import {RouterModule} from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
    FormsModule,
    ReactiveFormsModule,
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
    MatSortModule,
    HttpModule
  ],
  entryComponents: [
    EditDialogComponent, DeleteDialogComponent
  ],
  exports: [
    UserTableComponent
  ],
  providers: [
  ],
  declarations: [ UserTableComponent, AddDialogComponent, EditDialogComponent, DeleteDialogComponent]

})
export class UserBrowserModule { }
