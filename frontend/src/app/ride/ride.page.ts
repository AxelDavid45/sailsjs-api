import {Component, OnInit} from '@angular/core';
import {DEFAULT_RIDE_OBJECT, Ride} from "../../models/ride";
import {RideService} from "../../services/ride";
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-ride',
    templateUrl: './ride.page.html',
    styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
    ride: Ride = DEFAULT_RIDE_OBJECT
    id: string

    constructor(private rideService: RideService, private navController: NavController, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id')
        this.rideService.getById(this.id).subscribe((data: Ride) => {
            this.ride = data
            console.log(data)
        }, err => {
            alert('We could not get the ride')
            console.log(err)
        })
    }

    delete(id) {
        this.rideService.delete(this.ride.id).subscribe(data => {
            alert('Ride deleted')
            this.navController.pop()
        }, error => {
            alert('We could not delete the ride')
            console.log(error)
        })
    }
}
