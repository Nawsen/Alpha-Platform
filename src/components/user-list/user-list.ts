import {Component, EventEmitter, Output} from '@angular/core';
import {UserProvider} from "../../providers/database/user";
import {User} from "../../models/user";

/**
 * Generated class for the UserListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.html'
})
export class UserListComponent {

  @Output() selectedEvent = new EventEmitter();

  constructor(public userProvider: UserProvider) {
  }

  select(user: User) {
    this.selectedEvent.next(user);
  }

}
