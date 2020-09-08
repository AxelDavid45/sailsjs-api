import { Component, OnInit } from '@angular/core';
import {RideService} from "../../services/ride";
import {Ride} from "../../models/ride";
import {Observable} from "rxjs";

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
})
export class RidesPage implements OnInit {
  rides: Observable<[Ride]>
  constructor(private rideService:RideService) { }

  ngOnInit() {
    this.getRides()
  }

  getRides() {
    this.rides = this.rideService.getAll()
  }

  delete(id) {
    this.rideService.delete(id).subscribe(data => {
      alert('Ride deleted')
      this.getRides()
    }, error => {
      alert('We could not delete the ride')
      console.log(error)
    })
  }

}
