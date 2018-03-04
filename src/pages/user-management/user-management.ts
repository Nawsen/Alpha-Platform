import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {UserProvider} from "../../providers/database/user";
import {UserViewPage} from "../user-view/user-view";

@Component({
  selector: 'page-user-management',
  templateUrl: 'user-management.html',
})
export class UserManagementPage {


  users: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.userProvider.userList.subscribe((users: User[]) => {
      loading.dismiss();
      this.users = users;
    });

  }

  public select(user: User): void {
    this.navCtrl.push(UserViewPage, {user: user});

  }

}
