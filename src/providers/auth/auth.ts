import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  public user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  signInWithNameAndPassword(name: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(name + "@dereede.be", password).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }
}
