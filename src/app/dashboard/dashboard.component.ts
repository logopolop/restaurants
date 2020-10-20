import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getFromDbUserData().then((results) => {
      this.user = results;
    });
  }

}
