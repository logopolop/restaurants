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
  
  constructor(public authService: AuthService, private restauService: RestaurantService) {}

  onResetAll() {
    this.restauService.resetAllRestaurants();
  }

}
