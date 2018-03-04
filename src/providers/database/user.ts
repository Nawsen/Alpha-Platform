import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from "@angular/core";
import {User} from "../../models/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserProvider {

  USERS: string = '/users';

  filter: BehaviorSubject<string>;

  private users: Observable<User[]>;

  constructor(private db: AngularFireDatabase) {
    //set the filter to nothing
    this.filter = new BehaviorSubject<string>('');
  }


  get userList(): Observable<User[]> {
    if (this.users) {
      return this.users;
    }
    // noinspection TypeScriptUnresolvedFunction
    this.users = <Observable<User[]>>this.db.list(this.USERS)
      .combineLatest(this.filter, (users: User[], filter: string) => this.doFilter(users, filter))
      .publishReplay().refCount();
    return this.users;
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

  setFilter(val: any): void {
    this.filter.next(val);
  }

  public findUserById(key: string) {
    return this.db.object(this.USERS + '/' + key);
  }

  private doFilter(users: User[], filter: string): User[] {
    return users.filter(user => this.isValidByFilter(user, filter));
  }

  private isValidByFilter(user: User, filter: string): boolean {
    return user.name.indexOf(filter) >= 0 ||
      user.organization.indexOf(filter) >= 0 ||
      user.address.indexOf(filter) >= 0 ||
      user.email.indexOf(filter) >= 0 ||
      user.ssin.indexOf(filter) >= 0;
  }
}
