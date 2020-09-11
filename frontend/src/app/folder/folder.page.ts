import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Credential, DEFAULT_CREDENTIAL_OBJECT} from "../../models/credential";
import {AuthenticationService} from "../../services/authentication";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    isLoggingIn: Boolean = true
    credential: Credential = DEFAULT_CREDENTIAL_OBJECT

    constructor(private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private navController: NavController) {
    }

    ngOnInit() {
    }

    public toggleLogin = () => {
        this.isLoggingIn = !this.isLoggingIn
    }

    login() {
        if (this.isLoggingIn) {
            this.doLogin()
        } else {
            if (this.credential.password !== this.credential.passwordConfirm) {
                alert('Password does not match')
                return
            }

            this.authenticationService.signup({
                email: this.credential.email,
                password: this.credential.password
            }).subscribe((data: any) => {
                console.log(data)
                this.doLogin()
            }, err => {
                alert('There was an error in the sign up process')
                console.log(err)
            })
        }
    }

    doLogin() {
        this.authenticationService.login({
            email: this.credential.email,
            password: this.credential.password
        }).subscribe((data: any) => {
            console.log(data)
            localStorage.setItem('jwt', data.token)
            this.navController.navigateRoot('/rides')
        }, err => {
            alert('There was an error in the authentication process')
            console.log(err)
        })
    }

}
