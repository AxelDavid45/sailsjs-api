import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {RideService} from "../../services/ride";
import {DEFAULT_RIDE_OBJECT, Ride} from "../../models/ride";

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.page.html',
  styleUrls: ['./ride-form.page.scss'],
})
export class RideFormPage implements OnInit {
  id: string
  editing = false
  ride: Ride = DEFAULT_RIDE_OBJECT
  constructor(
      private activatedRoute: ActivatedRoute,
      private navController: NavController,
      private rideService: RideService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.editing = this.id !== 'new'
    if (this.editing) {
      this.rideService.getById(this.id).subscribe((data: Ride) => {
        this.ride = data
        console.log(data)
      }, err => {
        alert('We could not get the ride')
        console.log(err)
      })
    }
  }

  save() {
    if (this.editing) {
      this.rideService.update(this.ride).subscribe(data => {
        alert('Ride updated')
        this.navController.pop()
        console.log(data)
      }, error => {
        alert('We could not update the ride :(')
        console.log(error)
      })
    } else {
      this.rideService.create(this.ride).subscribe(data => {
        alert('Ride created')
        this.navController.pop()
        console.log(data)
      }, error => {
        alert('We could not create the ride :(')
        console.log(error)
      })
    }
  }
}
