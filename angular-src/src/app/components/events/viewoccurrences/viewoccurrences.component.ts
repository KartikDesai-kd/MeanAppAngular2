import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../services/event.service';
import {Event} from '../../events/eventInterface';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-viewoccurrences',
  templateUrl: './viewoccurrences.component.html',
  styleUrls: ['./viewoccurrences.component.css']
})
export class ViewoccurrencesComponent implements OnInit {
 events: Event[];
 activity:string;
 loggedin:number;
 id:string;
  constructor(private route: ActivatedRoute,private eventService:EventService) { }

  ngOnInit() {

         this.id=this.route.snapshot.queryParams['id'];
           this.eventService.getTasksid(this.id)
        .subscribe(events=>{
            this.events=events;
           this.activity=this.events[0].activity;
           this.loggedin=this.events[0].loggedin;

        });
  }

}
