import { Component } from '@angular/core';

/**
 * Generated class for the UserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent {

  text: string;

  constructor() {
    console.log('Hello UserComponent Component');
    this.text = 'Hello World';
  }

}
