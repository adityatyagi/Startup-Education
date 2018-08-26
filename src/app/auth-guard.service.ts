import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  // RouterStateSnapshot: with this we can get the URL which the user tried to access, when the canActivate kicked in
  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(
      map(user => {
        if (user) {
          return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
        return false;
      })
    );
  }
}
