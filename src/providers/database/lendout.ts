import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {LendOut} from "../../models/lendout";
import {AuthProvider} from "../auth/auth";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LendOutProvider {

  LENDOUTS: string = '/lendOuts';

  lendOuts: Observable<LendOut[]> = new Subject();

  constructor(private auth: AuthProvider, private db: AngularFireDatabase) {
    this.auth.user.subscribe((user) => {
      let userName = user.email.substring(0, user.email.indexOf('@'));
      this.LENDOUTS = userName + this.LENDOUTS;
      this.lendOuts = db.list(this.LENDOUTS);
    })
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
