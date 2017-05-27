import { Component } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  moduleId:module.id,
  selector: 'app-signup',
  templateUrl:'signup.component.html'

})

export class SignupComponent  {

    firstname:string;
    lastname:string;
    email:string;
    username:string;
    password:string;

    constructor(private router:Router,private authService:AuthService, private validateService:ValidateService, private flashMessage:FlashMessagesService){}

 onRegisterSubmit(){

    const user={
        firstname:this.firstname,
        lastname:this.lastname,
        email:this.email,
        username:this.username,
        password:this.password
    }

    //required field
    if(!this.validateService.validateRegister(user)){
        this.flashMessage.show('Please fill in all fields',{cssClass:'alert-danger',timeout:3000});
        return false;
    }

    //email valid
    if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please use a valid email',{cssClass:'alert-danger',timeout:3000});
        return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe(data=>{
        
        if(data.success){
            this.flashMessage.show('You are now registered and can log in',{cssClass:'alert-success',timeout:3000});
            this.router.navigate(['/signin']);
        }else{
            this.flashMessage.show('Something went wrong',{cssClass:'alert-danger',timeout:3000});
            this.router.navigate(['/signup']);
        }
    });
 }

}
