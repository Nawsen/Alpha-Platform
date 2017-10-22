import {DateTime} from "ionic-angular";

export class LendOut {

  $key: string;
  userId: string;
  itemId: string;
  LendoutTime: Date;
  checkInTime: Date;


  constructor(userId: string, itemId: string, LendoutTime: Date) {
    this.userId = userId;
    this.itemId = itemId;
    this.LendoutTime = LendoutTime;
  }
}
