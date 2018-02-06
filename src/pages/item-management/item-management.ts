import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {ItemProvider} from "../../providers/database/item";
import {Item} from "../../models/item";
import "rxjs";
import {ItemViewPage} from "../item-view/item-view";

@Component({
  selector: 'page-item-management',
  templateUrl: 'item-management.html',
})
export class ItemManagementPage implements OnInit {

  public itemList: Item[];

  public filter: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public itemService: ItemProvider,
              public loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.itemService.itemList.subscribe((items: Item[]) => {
      loading.dismiss();
      this.itemList = items;
    });

  }

  select(item) {
    this.navCtrl.push(ItemViewPage, {item: item});
  }

  setFilter(event) {
    let val = event.target.value;
    this.itemService.setFilter(val);
  }
}
