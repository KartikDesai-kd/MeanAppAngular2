import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username:string;
  password:string;
  constructor(private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){

    const user={
        username:this.username,
        password:this.password
    }

    //authenticate user
    this.authService.authenticateUser(user).subscribe(data=>{
        
        localStorage.setItem('username', this.username);
        console.log("unm1: "+localStorage.getItem('username'));
        if(data.success){
           this.authService.storeUserData(data.token,data.user)
            this.flashMessage.show('You are now logged in',{cssClass:'alert-success',timeout:3000});
            this.router.navigate(['/events']);
        }else{
            this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:5000});
            this.router.navigate(['/signin']);
        }
    });
  }
}
