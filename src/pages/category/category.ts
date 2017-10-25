import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Category} from "../../models/category";
import {CategoryProvider} from "../../providers/database/category";

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  category: Category = new Category("");

  constructor(private categoryProvider: CategoryProvider, public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get("category")) {
      this.category = this.navParams.get("category");
    }
  }

  save() {
    if (this.category.$key) {
      this.categoryProvider.editItem(this.category);
    } else {
      this.categoryProvider.addNewItem(this.category);
    }
    this.navCtrl.pop();
  }

  remove() {
    this.categoryProvider.deleteItem(this.category);
    this.navCtrl.pop();
  }

}
