import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-starttracking',
  templateUrl: './starttracking.component.html',
  styleUrls: ['./starttracking.component.css']
})
export class StarttrackingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {

     console.log(localStorage.getItem('username'));
    if(localStorage.getItem('username')!=null)
    {
       console.log("in");
         this.router.navigate(['/events']);
    }

  }

}
