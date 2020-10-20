import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Restaurant } from '../models/restaurant';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  createRestaurant(name) {
    return this.firestore.collection('restaurants').add({
      name, // <=> name: name
      createdAt: Date.now(),
      votes: 0
    })
  }

  readRestaurants() {
    return this.firestore.collection<Restaurant>('restaurants', (ref) => ref.orderBy('name', 'asc'));
  }

  voteForRestaurant(restaurant) {
    this.authService.updateVotes();
    return this.firestore.doc(`restaurants/${restaurant.id}`).update({
      ...restaurant,
      votes: restaurant.votes + 1
    });
  }

  deleteRestaurant(restaurant) {
    return this.firestore.doc(`restaurants/${restaurant.id}`).delete();
  }

  async resetAllRestaurants() {
    await this.firestore.collection("restaurants").get().toPromise().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          doc.ref.update({
              votes: 0
          });
      });
    });
  }
  
}
