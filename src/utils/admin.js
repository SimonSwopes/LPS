include User from './user.js';

/* Essentially once the back end for login is made we can use object type checking to see if
 * we need to load the user home page or the admin home page.
 */
class Admin extends User {
  constructor (name, email, address, cell, passwd) {
    super();
  }
}
