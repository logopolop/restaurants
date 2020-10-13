import { Component } from '@angular/core';
import { RestaurantService } from './services/restaurant.service';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isAuth: boolean;
  
  constructor(private authService: AuthService, private restauService: RestaurantService) {}

  onResetAll() {
    this.restauService.resetAllRestaurants();
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
