// Class or the user


class User {
  constructor(name, email, address, cell, passwd) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.cell = cell;
    this.passwd = passwd;
    this.ID = Date.now();
  }
}
