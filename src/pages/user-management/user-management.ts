import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";
import {UserPage} from "../user/user";

@Component({
  selector: 'page-user-management',
  templateUrl: 'user-management.html',
})
export class UserManagementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  select(user: User) {
    this.navCtrl.push(UserPage, {user: user});
  }

}
