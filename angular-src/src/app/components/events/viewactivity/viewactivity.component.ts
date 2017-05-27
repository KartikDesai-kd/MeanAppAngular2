import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router,NavigationExtras } from '@angular/router';
import {EventService} from '../../../services/event.service';

@Component({
  selector: 'app-viewactivity',
  templateUrl: './viewactivity.component.html',
  styleUrls: ['./viewactivity.component.css']
})
export class ViewactivityComponent implements OnInit {

  id:string;
  activity:string;
  views:string[];

  constructor(private eventService:EventService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

          this.id = this.route.snapshot.queryParams['id'];
          this.activity = this.route.snapshot.queryParams['activity'];
      //    this.views= { id: this.id,activity:this.activity};
  }

  deleteTask(){
             this.eventService.deleteTask(this.id).subscribe(data => {
            this.router.navigate(['/events'])
       });
   }

       editTask(){
             this.router.navigate(['/editevent'],{ queryParams: { id:this.id,activity:this.activity}})
   }


}
