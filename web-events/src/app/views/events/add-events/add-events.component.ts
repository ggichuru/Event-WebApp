import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss']
})
export class AddEventsComponent implements OnInit {
  eventForm: FormGroup;
  userId: any;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private eventsService: EventsService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.eventForm = this.fb.group({
      eventName: [''],
      eventOrganizer: [''],
      location: [''],
      description: [''],
      // imageUrl: [''],
      eventDate: [''],
      // userId: [this.userId],
      // categoryId: [''],
    })
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId()
  }

  onSubmit(): any {
    this.eventsService.addEvent(this.eventForm.value, )
      .subscribe(() => {
        this._snackBar.open('Event added successfuly', 'View',{
          duration: 1000
        })
        this.ngZone.run(() => {
          this.router.navigate(['events'])
        }, (err: any) => {
          this._snackBar.open(err, 'error', {
            duration: 3000
          })
        })
      })
  }

}
