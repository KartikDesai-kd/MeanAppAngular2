import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {Event} from '../events/eventInterface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[];
  constructor(private router:Router,private eventService:EventService) {

     this.eventService.getTasks()
         .subscribe(events=>{
            this.events=events;

        });
   }

  ngOnInit() {

  }

  editlog(task){
        var logcount=parseInt(task.loggedin)+1;

        var _task = {
            _id:task._id,
            username: task.username,
            activity: task.activity,
            loggedin:logcount
        };

        this.eventService.editActivity(_task).subscribe(data => {

            this.eventService.getTasks()
            .subscribe(events=>{
                this.events=events;

            });
           this.router.navigate(['/events'])
        });
    }

    viewoccurrence(occur){

             this.router.navigate(['/viewoccurrence'],{ queryParams: { id:occur}})
   }
}
