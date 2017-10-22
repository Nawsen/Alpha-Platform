import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {User} from "../../models/user";

@Injectable()
export class UserProvider {

  USERS: string = 'users';

  users: Observable<User[]>;

  constructor(private db: AngularFireDatabase) {
    this.users = db.list(this.USERS);
  }

  public addNewUser(user: User) {
    this.db.list(this.USERS).push(user);
  }

  public editUser(user: User) {
    this.db.list(this.USERS).update(user.$key, user);
  }

  public deleteUser(user: User) {
    this.db.list(this.USERS).remove(user.$key);
  }
}
