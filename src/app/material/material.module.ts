import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatDividerModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatDividerModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {}