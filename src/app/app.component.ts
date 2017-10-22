import { Component, ViewChild } from '@angular/core';
import {App, MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {AuthProvider} from "../providers/auth/auth";
import {LendingPage} from "../pages/lending/lending";
import {ItemManagementPage} from "../pages/item-management/item-management";
import {UserManagementPage} from "../pages/user-management/user-management";

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
              private menuController: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Lending', component: LendingPage, icon: 'repeat' },
      { title: 'Item management', component: ItemManagementPage, icon: 'pricetags' },
      { title: 'User management', component: UserManagementPage, icon: 'people' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.auth.user.subscribe((user) => {
      //   if (user === null) {
      //     this.app.getRootNav().setRoot(AuthPage);
      //     this.menuController.close().then(() => {
      //       this.enableSideMenu = false;
      //     });
      //
      //   } else {
          this.app.getRootNav().setRoot(HomePage);
          this.enableSideMenu = true;
          this.menuController.open();
      //   }
      // })

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}