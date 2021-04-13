import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsListComponent } from './views/events/events-list/events-list.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './views/user/login/login.component';
import { SignupComponent } from './views/user/signup/signup.component';
import { AddEventsComponent } from './views/events/add-events/add-events.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsDetailsComponent } from './views/events/events-details/events-details.component';
import { EventsEditComponent } from './views/events/events-edit/events-edit.component';
import { EditComponent } from './views/events/events-edit/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    LoginComponent,
    SignupComponent,
    AddEventsComponent,
    EventsDetailsComponent,
    EventsEditComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token')
        },
        allowedDomains: ['localhost:4200']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
