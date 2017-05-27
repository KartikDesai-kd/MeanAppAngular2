import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService:AuthService, private router:Router){

  }

  canActivate(){
     console.log("in canActivate");
    if(this.authService.loggedIn()){
      console.log("in if");
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
