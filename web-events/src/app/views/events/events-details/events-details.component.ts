import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent implements OnInit {
  eventDetails: any;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getEvent(this.route.snapshot.paramMap.get('id'))
  }

  getEvent(id: any) {
    this.eventsService.getOneEvent(id)
      .subscribe(data => {
        this.eventDetails = data
      }, error => {
        this._snackBar.open(error, 'error', {
          duration: 3000
        })
      })
  }
}
