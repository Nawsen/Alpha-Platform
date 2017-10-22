import {Component} from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {Item} from "../../models/item";
import {UserSelectPage} from "../user-select/user-select";
import {LendOutProvider} from "../../providers/database/lendout";
import {LendOut} from "../../models/lendout";

@Component({
  selector: 'page-home',
  templateUrl: 'lending.html'
})
export class LendingPage {

  lendOuts: LendOut[]= [];

  constructor(public navCtrl: NavController, private lendOutProvider: LendOutProvider, public actionSheetCtrl: ActionSheetController) {
    this.lendOutProvider.lendOuts.subscribe((resp: LendOut[]) => {
      this.lendOuts = resp;
    });
  }

  selected(item: Item) {
    let foundLendout: LendOut;
    for (const lendOut of this.lendOuts) {
      //item lended out & not checked back in
      if (lendOut.itemId === item.$key && !lendOut.checkInTime) {
        foundLendout = lendOut;
      }
    }

    if (foundLendout) {
      this.presentActionSheet(item, foundLendout);
    } else {
      this.navCtrl.push(UserSelectPage, {item: item});
    }
  }

  presentActionSheet(item: Item, lendOut: LendOut) {
    let actionSheet = this.actionSheetCtrl.create({
      title: item.name,
      buttons: [
        {
          text: 'Check in',
          handler: () => {
            lendOut.checkInTime = Date.now();
            this.lendOutProvider.editLendOut(lendOut);
          }
        }
      ]
    });
    actionSheet.present();
  }

}
