import { Component } from '@angular/core';
import { RestaurantService } from './services/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private restauService: RestaurantService) {}

  onResetAll() {
    this.restauService.resetAllRestaurants();
  }

}
