import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestaurantService } from '../services/restaurant.service';

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html',
})
export class ModalComponent {

    constructor(
        private restaurantService: RestaurantService,
        public dialogRef: MatDialogRef<ModalComponent>, 
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    onNoClick() {
        this.dialogRef.close();
    }

    async onConfirmDelete() {
        this.dialogRef.close();
        await this.restaurantService.deleteRestaurant(this.data);
    }
}