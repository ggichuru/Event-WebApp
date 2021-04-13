import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EventsListComponent } from './views/events/events-list/events-list.component';
import { LoginComponent } from './views/user/login/login.component';
import { SignupComponent } from './views/user/signup/signup.component';

const routes: Routes = [
  { path:'events' , component: EventsListComponent, canActivate:[AuthGuard]},
  { path:'log-in', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
