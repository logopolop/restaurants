import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-modal-component',
  template: `
    <h2 mat-dialog-title>Supprimer ce lieu ?<br />{{ data.name }} ?</h2>
    <mat-dialog-content class="mat-typography">
        <p>Etes-vous vraiment sûr ?<br />Les votes seront perdus pour toujours.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button mat-button color="primary" (click)="onNoClick()">No Thanks</button>
        <button mat-button color="primary" (click)="onConfirmDelete()" cdkFocusInitial>Oui, supprimer</button>
    </mat-dialog-actions>
  `,
})
export class ModalComponent {
  constructor(
    private rs: RestaurantService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close('nope');
  }

  async onConfirmDelete() {
    const result = await this.rs.deleteRestaurant(this.data);
    this.dialogRef.close(result);
  }
}
