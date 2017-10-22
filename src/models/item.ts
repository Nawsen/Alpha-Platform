export class Item {

  $key: string;
  category: string;
  name: string;
  picture: string;

  constructor(category: string, name: string, picture: string) {
    this.category = category;
    this.name = name;
    this.picture = picture;
  }

}
