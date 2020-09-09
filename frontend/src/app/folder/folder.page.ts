import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DEFAULT_CREDENTIAL_OBJECT, Credential} from "../../models/credential";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  credential: Credential = DEFAULT_CREDENTIAL_OBJECT
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  login() {
    // TODO login or signup
  }

}
