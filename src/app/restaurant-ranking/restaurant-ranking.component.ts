import { Component, Input, OnChanges } from '@angular/core';
import { map } from "rxjs/operators";
import { Restaurant } from '../models/restaurant';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

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
  modalResult;

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

  openConfirmDialog(restaurant) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { ...restaurant }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.modalResult = result;
    });
  }
}
