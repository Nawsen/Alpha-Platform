export class User {

  $key: string;
  name: string;
  ssin: string;
  organization: string;
  address: string;
  phone: string;
  email: string;
  picture: string;
  barcode: string;


  constructor(name: string, ssin: string, organization: string, address: string, phone: string, email: string, picture: string, barcode: string) {
    this.name = name;
    this.ssin = ssin;
    this.organization = organization;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.picture = picture;
    this.barcode = barcode;
  }
}
