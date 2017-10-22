export class User {

  $key: string;
  name: string;
  ssin: string;


  constructor(name: string, ssin: string) {
    this.name = name;
    this.ssin = ssin;
  }
}
