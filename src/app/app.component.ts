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
      router.navigateByUrl(returnUrl);
    }
  });
}
}
