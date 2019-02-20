import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  declarations: []
})
export class MaterialModule { }
