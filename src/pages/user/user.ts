import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {UserProvider} from "../../providers/database/user";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: User = new User("", "", "", "", "", "", "", "");

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
    if (this.navParams.get("user")) {
      this.user = this.navParams.get("user");
    }
  }

  save() {
    if (this.user.$key) {
      this.userProvider.editUser(this.user);
    } else {
      this.userProvider.addNewUser(this.user);
    }
    this.navCtrl.pop();
  }

  remove() {
    this.userProvider.deleteUser(this.user);
    this.navCtrl.pop();
  }
}
