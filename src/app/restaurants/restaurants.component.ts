import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SuggestionListComponent } from '../suggestion-list/suggestion-list.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
