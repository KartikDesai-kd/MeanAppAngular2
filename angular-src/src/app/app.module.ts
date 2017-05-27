import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{RouterModule,Routes} from '@angular/router';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './components/home/home.component';
import { SignupComponent }  from './components/signup/signup.component';

import { SigninComponent }  from './components/signin/signin.component';

import { EventsComponent }  from './components/events/events.component';
import { LearnmoreComponent }  from './components/learnmore/learnmore.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateeventComponent } from './components/events/createevent/createevent.component';
import { EditeventComponent } from './components/events/editevent/editevent.component';
import { ViewactivityComponent } from './components/events/viewactivity/viewactivity.component';
import { ViewoccurrencesComponent } from './components/events/viewoccurrences/viewoccurrences.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';

import {ValidateService} from './services/validate.service';
import {EventService} from './services/event.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { ProfileComponent } from './components/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import { StarttrackingComponent } from './components/starttracking/starttracking.component';

const appRoutes:Routes=[
{
       path:'',
       component: HomeComponent

    },
    {
        path:'signup',
       component: SignupComponent
    },
    {
        path:'signin',
       component: SigninComponent
    },
    {
        path:'events',
       component: EventsComponent, canActivate:[AuthGuard]
    },
    {
        path:'learnmore',
       component: LearnmoreComponent
    },
    {
        path:'createevent',
       component: CreateeventComponent
    },
    {
        path:'editevent',
       component: EditeventComponent
    },
    {
        path:'viewactivity',
       component: ViewactivityComponent
    },
    {
        path:'viewoccurrence',
       component: ViewoccurrencesComponent
    },
    {
        path:'editprofile',
       component: EditprofileComponent
    },
    {
        path:'editpassword',
       component: ChangepasswordComponent
    },
    {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    {
        path:'starttracking',
       component: StarttrackingComponent
    },
]

@NgModule({
  declarations: [
    AppComponent,NavbarComponent,HomeComponent,SignupComponent,SigninComponent,EventsComponent,LearnmoreComponent,CreateeventComponent,EditeventComponent,ViewactivityComponent,ViewoccurrencesComponent,EditprofileComponent,ChangepasswordComponent, ProfileComponent, StarttrackingComponent
  ],
  imports: [
    BrowserModule, FormsModule,ReactiveFormsModule, HttpModule,RouterModule.forRoot(appRoutes),FlashMessagesModule
  ],
  providers: [ValidateService,AuthService,AuthGuard,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
