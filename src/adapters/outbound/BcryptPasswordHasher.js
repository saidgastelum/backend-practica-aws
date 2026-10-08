const bcrypt = require('bcryptjs');
const PasswordHasherPort = require('../../application/ports/PasswordHasherPort');

class BcryptPasswordHasher extends PasswordHasherPort {
  async compare(plain, hash) { return bcrypt.compare(plain, hash); }
}
module.exports = BcryptPasswordHasher;
