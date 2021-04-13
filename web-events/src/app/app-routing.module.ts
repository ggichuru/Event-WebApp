import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AddEventsComponent } from './views/events/add-events/add-events.component';
import { EventsDetailsComponent } from './views/events/events-details/events-details.component';
import { EditComponent } from './views/events/events-edit/edit/edit.component';
import { EventsEditComponent } from './views/events/events-edit/events-edit.component';
import { EventsListComponent } from './views/events/events-list/events-list.component';
import { LoginComponent } from './views/user/login/login.component';
import { SignupComponent } from './views/user/signup/signup.component';

const routes: Routes = [
  { path:'events' , component: EventsListComponent, canActivate:[AuthGuard]},
  { path:'events/:id' , component: EventsDetailsComponent, canActivate:[AuthGuard]},
  { path:'events/user/:id' , component: EventsEditComponent, canActivate:[AuthGuard]},
  { path:'events/user/:id/:id', component:EditComponent, canActivate:[AuthGuard] },
  { path: 'add-event', component: AddEventsComponent, canActivate: [AuthGuard]},
  { path:'log-in', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
