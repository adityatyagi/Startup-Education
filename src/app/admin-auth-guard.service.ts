import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin)
    );
  }
  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(
  //     // map firebase user object to app user object
  //     switchMap(user => {
  //       return this.userService.get(user.uid);
  //     }),
  //     map(appUser => appUser.isAdmin)
  //   );
  // }
}
