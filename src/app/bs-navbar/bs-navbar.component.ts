import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  constructor(public auth: AuthService) {
  }
  // navbar background color according to the environment
  // backgroundColor = environment.navBarBackgroundColor;
  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
