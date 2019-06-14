import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';

@NgModule({
imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule
    ],
exports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule
    ],
})
export class CustomMaterialModule { }