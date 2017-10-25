import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CategoryProvider} from "../../providers/database/category";
import {CategoryPage} from "../category/category";

@Component({
  selector: 'page-category-management',
  templateUrl: 'category-management.html',
})
export class CategoryManagementPage {

  constructor(public categoryProvider: CategoryProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  select(category) {
    this.navCtrl.push(CategoryPage, {category: category});
  }

}
