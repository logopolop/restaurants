import { Component, Input, OnChanges, Inject } from '@angular/core';
import { map } from "rxjs/operators";
import { Restaurant } from '../models/restaurant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-ranking',
  templateUrl: './restaurant-ranking.component.html',
  styleUrls: ['./restaurant-ranking.component.scss']
})
export class RestaurantRankingComponent implements OnChanges {

  @Input()
  restaurants$;
  sortedBestRestaurants: Restaurant[];
  sortedRestOfRestaurants: Restaurant[];

  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes): void {
    if (!changes.restaurants$.currentValue) {
      return;
    }
    changes.restaurants$.currentValue
    .pipe(
      map((restaurants: Restaurant[]) => {
        const sortResult = restaurants.sort(this.sortByScore);
        this.sortedBestRestaurants = sortResult.slice(0, 3);
        this.sortedRestOfRestaurants = sortResult.slice(3) ? sortResult.slice(3) : [];
        
      })
    ).subscribe();
  }

  sortByScore(a, b) {
    if (a.votes > b.votes) {
      return -1;
    } else {
      return 1;
    }
    return 0;
  }

  setRankLabel(restaurant) {
    return restaurant.votes <= 1 ? `<b>${restaurant.votes} vote</b> pour ${restaurant.name}` : `<b>${restaurant.votes} votes</b> pour ${restaurant.name}`;
  }

  openConfirmDialog(restaurant): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { ...restaurant }
    });
  }
}

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  constructor(
      private restaurantService: RestaurantService,
      public dialogRef: MatDialogRef<ModalComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick() {
      this.dialogRef.close();
  }

  async onConfirmDelete() {
      await this.restaurantService.deleteRestaurant(this.data);
      this.dialogRef.close();
  }
}
