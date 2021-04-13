import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editEvent: any;
  currentEvent: any;
  eventForm: FormGroup;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
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
    this.getEvent(this.route.snapshot.paramMap.get('id'))
  }

  getEvent(id: any) {
    this.eventsService.getOneEvent(id)
      .subscribe(data => {
        this.editEvent = data
      }, error => {
        this._snackBar.open(error, 'error', {
          duration: 3000
        })
      })
  }

  updateEvent(id: any, event: Event) {
    this.eventsService.updateEvent(id, event)
    .subscribe(
      response => {
        console.log(response);
        this._snackBar.open('Update successful', 'error', {
          duration: 3000
        })
        this.router.navigate(['events/user/:id'])
      },
      error => {
        console.log(error);
      });
  }

  deleteEvent(id: any) {
    this.eventsService.deleteEvent(id)
    .subscribe(
      response => {
        console.log(response);
        this._snackBar.open('Delete successful', 'error', {
          duration: 3000
        })
        this.router.navigate(['events/user/:id'])
      },
      error => {
        console.log(error);
      });
  }
}
