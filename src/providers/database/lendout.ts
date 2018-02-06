import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {LendOut} from "../../models/lendout";
import {AuthProvider} from "../auth/auth";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LendOutProvider {

  private LENDOUTS: string = '';

  private lendOutsByUser: Observable<LendOut[]>;
  private filterByUser: BehaviorSubject<string>;

  private lendOutsByItem: Observable<LendOut[]>;
  private filterByItem: BehaviorSubject<string>;


  constructor(private auth: AuthProvider, private db: AngularFireDatabase) {
    this.filterByItem = new BehaviorSubject<string>('');
    this.filterByUser = new BehaviorSubject<string>('');

  }

  public getLendoutsByItem(key: string) {
    this.filterByItem.next(key);
    if (this.lendOutsByItem) {
      return this.lendOutsByItem;
    }

    this.lendOutsByItem = this.auth.user
      .map((user) => user.email.substring(0, user.email.indexOf('@')) + "/lendOuts")
      .map((itemsUrl: string) => this.LENDOUTS = itemsUrl)
      .flatMap(() => this.db.list(this.LENDOUTS, {
        query: {
          orderByChild: 'itemId',
          equalTo: this.filterByItem
        }
      }));

    return this.lendOutsByItem;
  }

  public getLendoutsByUser(key: string) {
    this.filterByUser.next(key);
    if (this.lendOutsByUser) {
      return this.lendOutsByUser;
    }

    this.lendOutsByUser = this.auth.user
      .map((user) => user.email.substring(0, user.email.indexOf('@')) + "/lendOuts")
      .map((itemsUrl: string) => this.LENDOUTS = itemsUrl)
      .flatMap(() => this.db.list(this.LENDOUTS, {
        query: {
          orderByChild: 'userId',
          equalTo: this.filterByUser
        }
      }));

    return this.lendOutsByUser;
  }

  public addNewLendOut(lendOut: LendOut) {
    this.db.list(this.LENDOUTS).push(lendOut);
  }

  public editLendOut(lendOut: LendOut) {
    this.db.list(this.LENDOUTS).update(lendOut.$key, lendOut);
  }

  public deleteLendOut(lendOut: LendOut) {
    this.db.list(this.LENDOUTS).remove(lendOut.$key);
  }
}
