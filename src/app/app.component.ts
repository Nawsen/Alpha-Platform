import { Component, ViewChild } from '@angular/core';
import {App, MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {AuthProvider} from "../providers/auth/auth";
import {LendingPage} from "../pages/lending/lending";
import {ItemManagementPage} from "../pages/item-management/item-management";
import {UserManagementPage} from "../pages/user-management/user-management";
import {AuthPage} from "../pages/auth/auth";
import {CategoryManagementPage} from "../pages/category-management/category-management";
import {CategoryProvider} from "../providers/database/category";
import {ItemProvider} from "../providers/database/item";
import {LendOutProvider} from "../providers/database/lendout";
import {UserProvider} from "../providers/database/user";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  enableSideMenu: boolean = false;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public app: App,
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public auth: AuthProvider,
              private menuController: MenuController,
              private category: CategoryProvider,
              private item: ItemProvider,
              private lendout: LendOutProvider,
              private user: UserProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Lending', component: LendingPage, icon: 'repeat' },
      { title: 'Item management', component: ItemManagementPage, icon: 'pricetags' },
      { title: 'User management', component: UserManagementPage, icon: 'people' },
      { title: 'Category management', component: CategoryManagementPage, icon: 'bookmark' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuController.close();
      this.auth.user.subscribe((user) => {
        if (user === null) {
          this.menuController.close();
          this.app.getRootNav().setRoot(AuthPage);
          this.menuController.close().then(() => {
            this.enableSideMenu = false;
          });

        } else {
          console.log(user);
          this.app.getRootNav().setRoot(HomePage);
          this.enableSideMenu = true;
          this.menuController.open();
          this.initAllLoaders();
        }
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout();
  }

  private initAllLoaders() {
    this.category.categories;
    this.item.items;
    this.lendout.lendOuts;
    this.user.users;
  }
}
