import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../services/event.service';
import {Event} from '../../events/eventInterface';
@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {

      events: Event[];
      id:string;
      activity:string;
      loggedin:number;
  constructor(private route: ActivatedRoute,private eventService:EventService,private router: Router) { }

  ngOnInit() {

       this.id = this.route.snapshot.queryParams['id'];
       this.activity = this.route.snapshot.queryParams['activity'];

       this.eventService.getTasksid(this.id)
        .subscribe(events=>{
          this.events=events;
          this.loggedin=this.events[0].loggedin;

       });
  }

  editActivity(){
       var task = {
           _id:this.id,
           username:localStorage.getItem('username'),
           activity: this.activity,
           loggedin:this.loggedin
       };

       this.eventService.editActivity(task).subscribe(data => {
           this.router.navigate(['/events'])
       });
   }

   gotoEvent(){
     this.router.navigate(['/events']);
   }
}
