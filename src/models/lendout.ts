export class LendOut {

  $key: string;
  userId: string;
  itemId: string;
  checkOutTime: number;
  checkInTime: number;


  constructor(userId: string, itemId: string, checkOutTime: number) {
    this.userId = userId;
    this.itemId = itemId;
    this.checkOutTime = checkOutTime;
  }

}
