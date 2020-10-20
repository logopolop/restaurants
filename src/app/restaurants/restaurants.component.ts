import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  user: any;
  canVoteAgain: Boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.authService.getFromDbUserData().then((results) => {
        this.user = results;
        this.canVoteAgain = this.checkTimestampVote();
      });
    }
  }

  // Return TRUE si on peut voter à nouveau
  checkTimestampVote() {

    // On prend le timestamp en base auquel on ajoute 60 minutes en ms (*60000) 
    // pour avoir l'heure à laquelle on  peut revoter
    let d1 = this.user.lastVoteAt.toDate().getTime() + 60 * 60000; 
    // La date actuelle
    let d2 = new Date;
    
    // Check if the dates are equal
    let same = d1 === d2.getTime();

    if (same) return true;
    if (d1 < d2) return true;
    if (d1 > d2) return false;
  }

}
