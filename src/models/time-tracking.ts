export class TimeTracking {

  $key: string;
  userId: string;
  time: number;


  constructor(userId: string, time: number) {
    this.userId = userId;
    this.time = time;
  }
}
