import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../services/event.service';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})
export class CreateeventComponent implements OnInit {

  username:string;
  activity:string;
  loggedin:number;
  constructor(private router:Router,private eventService:EventService, private validateService:ValidateService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  
  this.username=localStorage.getItem('username');
  }

  gotoEvent(){
    this.router.navigate(['/events']);
  }
  addActivity(){

      const activity={

        username:localStorage.getItem('username'),
        activity:this.activity,
        loggedin:0
      }

      //required field
      if(!this.validateService.validateActivity(activity)){
          this.flashMessage.show('Please enter activity',{cssClass:'alert-danger',timeout:3000});
          return false;
      }

      this.eventService.addActivity(activity).subscribe(data=>{

          if(data.success){
             this.flashMessage.show('Activity successfully added in your list',{cssClass:'alert-success',timeout:3000});
             this.router.navigate(['/events']);
          }else{
             this.flashMessage.show('Something went wrong',{cssClass:'alert-danger',timeout:3000});
             this.router.navigate(['/createevent']);
          }
      });
  }
}
