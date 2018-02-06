import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {User} from "../../models/user";
import {AuthProvider} from "../auth/auth";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserProvider {

  USERS: string = '/users';

  users: Observable<User[]> = new Subject();

  constructor(private auth: AuthProvider, private db: AngularFireDatabase) {
    this.auth.user.subscribe((user)=> {
      let userName = user.email.substring(0, user.email.indexOf('@'));
      this.USERS = userName + this.USERS;
    this.users = db.list(this.USERS);
    })
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

  public findUserById(key: string) {
    return this.db.object(this.USERS + '/' + key);
  }
}
