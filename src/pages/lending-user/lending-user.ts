import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {LendOutProvider} from "../../providers/database/lendout";
import {LendOut} from "../../models/lendout";
import {Item} from "../../models/item";
import {UserProvider} from "../../providers/database/user";

@Component({
  selector: 'page-lending-user',
  templateUrl: 'lending-user.html',
})
export class LendingUserPage implements OnInit {

  item: Item;

  users: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lendoutProvider: LendOutProvider,
              public userProvider: UserProvider,
              public loadingCtrl: LoadingController) {
    this.item = navParams.get('item');
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
    this.lendoutProvider.addNewLendOut(new LendOut(user.$key, this.item.$key, Date.now()));
    this.navCtrl.pop();
  }

}
