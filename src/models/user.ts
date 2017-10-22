export class User {

  $key: string;
  name: string;
  ssin: string;
  organization: string;
  address: string;
  phone: string;
  email: string;


  constructor(name: string, ssin: string, organization: string, address: string, phone: string, email: string) {
    this.name = name;
    this.ssin = ssin;
    this.organization = organization;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}
