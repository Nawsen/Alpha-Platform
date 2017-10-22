import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {LendOut} from "../../models/lendout";

@Injectable()
export class LendOutProvider {

  LENDOUTS: string = 'lendOuts';

  lendOuts: Observable<LendOut[]>;

  constructor(private db: AngularFireDatabase) {
    this.lendOuts = db.list(this.LENDOUTS);
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
