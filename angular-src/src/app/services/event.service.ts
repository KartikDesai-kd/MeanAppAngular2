import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
  activity:any;
  constructor(private http:Http) { }

  addActivity(activity){

      let headers=new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('activity/addactivity',activity,{headers:headers})
            .map(res=>res.json());
  }

  getTasks(){

         return this.http.get('activity/activity/'+localStorage.getItem('username'))
             .map(res=>res.json());
     }

    getTasksid(id){

         return this.http.get('activity/activitybyid/'+id)
             .map(res=>res.json());
     }

     editActivity(task){
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http.put('activity/edittask/'+task._id, JSON.stringify(task), {headers: headers})
            .map(res => res.json());
    }

    deleteTask(id){

      return this.http.delete('activity/deletetask/'+id)
          .map(res => res.json());
   }
}
