import {Component} from '@angular/core';
import {User} from "../../models/user";
import {NavController, NavParams} from "ionic-angular";
import {TimeTracking} from "../../models/time-tracking";
import {TimeTrackingProvider} from "../../providers/database/time-tracking";

Date.prototype.toISOString = function () {
  var tzo = -this.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
  return this.getFullYear() +
    '-' + pad(this.getMonth() + 1) +
    '-' + pad(this.getDate()) +
    'T' + pad(this.getHours()) +
    ':' + pad(this.getMinutes()) +
    ':' + pad(this.getSeconds()) +
    dif + pad(tzo / 60) +
    ':' + pad(tzo % 60);
}

@Component({
  selector: 'page-time-tracking',
  templateUrl: 'time-tracking.html',
})
export class TimeTrackingPage {

  user: User;

  timeTrack: TimeTracking;

  date: string = new Date().toISOString();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private timeTrackingProvider: TimeTrackingProvider) {
    this.user = navParams.get('user');
    this.timeTrack = this.navParams.get('timetrack');
  }

  public save(): void {
    if (this.timeTrack) {
      this.timeTrack.time = Date.parse(this.date);
      this.timeTrackingProvider.editTimeTracking(this.timeTrack);
    } else {
      this.timeTrack = new TimeTracking(this.user.$key, Date.parse(this.date));
      this.timeTrackingProvider.addNewTimeTracking(this.timeTrack);
    }
    this.navCtrl.pop();
  }

  public remove(): void {
    this.timeTrackingProvider.deleteTimeTracking(this.timeTrack);
    this.navCtrl.pop();
  }
}
