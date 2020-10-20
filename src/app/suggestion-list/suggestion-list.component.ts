import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent implements OnInit {

  @Input()
  canVote: Boolean;

  restaurantsCollection: AngularFirestoreCollection<Restaurant>;
  restaurants$: Observable<Restaurant[]>;

  constructor(private restaurantService: RestaurantService) { }

  async ngOnInit() {
    this.restaurantsCollection = await this.restaurantService.readRestaurants();
    this.restaurants$ = this.restaurantsCollection.valueChanges({ idField: 'id' }); // idfield : permet de rendre accessible l'id sous le nom 'id'
  }

  onVoted(restaurant) {
    this.restaurantService.voteForRestaurant(restaurant);
  }

  setRankLabel(restaurant) {
    return restaurant.votes <= 1 ? `${restaurant.votes} vote` : `${restaurant.votes} votes`;
  }

}
