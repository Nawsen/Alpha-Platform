export class Item {

  $key: string;
  category: string;
  name: string;
  picture: string;
  barcode: string;

  constructor(category: string, name: string, picture: string, barcode: string) {
    this.category = category;
    this.name = name;
    this.picture = picture;
    this.barcode = barcode;
  }

}
