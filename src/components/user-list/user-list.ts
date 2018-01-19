import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.html'
})
export class UserListComponent {

  @Output() selectedEvent = new EventEmitter();

  @Input() users: User[];

  constructor() {
  }

  select(user: User) {
    this.selectedEvent.next(user);
  }

}
