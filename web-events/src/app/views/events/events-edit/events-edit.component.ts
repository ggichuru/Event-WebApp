import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.scss']
})
export class EventsEditComponent implements OnInit {
  userEvent: any = [];
  editEvent: any;
  currentUser: any;
  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private _snackbar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserId()
    this.getUserEvent(this.route.snapshot.paramMap.get(`id`))
    
  }

  getUserEvent(id = this.currentUser) {
    this.eventsService.getUserEvent(id)
      .subscribe(data => {
        this.userEvent = data
      }, error => {
        this._snackbar.open(error, 'error', {
          duration: 3000
        })
      })
  }
  getEvent(id: any) {
    this.eventsService.getOneEvent(id)
      .subscribe(data => {
        this.editEvent = data
      }, error => {
        this._snackbar.open(error, 'error', {
          duration: 3000
        })
      })
  }

  deleteEvent(id: any) {
    this.eventsService.deleteEvent(id)
    .subscribe(
      response => {
        console.log(response);
        this._snackbar.open('Delete successful', 'error', {
          duration: 3000
        })
       // this.router.navigate(['events/user/:id'])
      },
      error => {
        console.log(error);
      });
  }
}

