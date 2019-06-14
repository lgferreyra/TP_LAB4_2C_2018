import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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