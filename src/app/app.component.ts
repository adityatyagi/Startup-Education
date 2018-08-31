import { UserService } from './user.service';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
// subscribe to the user$ of authentication service, when the user logs in, we read the local storage and redirect to the return url
constructor(private userService: UserService, private auth: AuthService, router: Router) {
  auth.user$.subscribe(user => {
    if (user) {
      userService.save(user);
      // when a user logs in, it should be stored in the db
      const returnUrl = localStorage.getItem('returnUrl');

      // this redirection to the home page must be done only once when the user logs in for the first time
      // delete the returnUrl once read to redirect the user to the home page
      // user logs in -> send to google authentication + store the returnUrl
      // come back from google auth, read the returnUrl and redirect, only this time, not in future.
      if (returnUrl) {
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    }
  });
}
}
