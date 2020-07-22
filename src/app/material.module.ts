import { NgModule } from '@angular/core';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

const materials = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatTooltipModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatDialogModule
]

@NgModule({
  imports: [
    materials
  ],
  exports: [
    materials
  ]
})
export class MaterialModule { }
