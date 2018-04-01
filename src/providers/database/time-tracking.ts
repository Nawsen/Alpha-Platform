import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {TimeTracking} from "../../models/time-tracking";

@Injectable()
export class TimeTrackingProvider {

  private TIMETRACKING: string = '/timeTracking';

  private timeTrackingByUser: Observable<TimeTracking[]>;
  private filterByUser: BehaviorSubject<string>;

  constructor(private db: AngularFireDatabase) {
    this.filterByUser = new BehaviorSubject<string>('');

  }

  public getTrackingByUser(key: string) {
    this.filterByUser.next(key);
    if (this.timeTrackingByUser) {
      return this.timeTrackingByUser;
    }

    this.timeTrackingByUser = this.db.list(this.TIMETRACKING, {
      query: {
        orderByChild: 'userId',
        equalTo: this.filterByUser
      }
    });

    return this.timeTrackingByUser;
  }

  public addNewTimeTracking(TimeTracking: TimeTracking) {
    this.db.list(this.TIMETRACKING).push(TimeTracking);
  }

  public editTimeTracking(TimeTracking: TimeTracking) {
    this.db.list(this.TIMETRACKING).update(TimeTracking.$key, TimeTracking);
  }

  public deleteTimeTracking(TimeTracking: TimeTracking) {
    this.db.list(this.TIMETRACKING).remove(TimeTracking.$key);
  }
}
