class PasswordHasherPort {
  async compare(plain, hash) { throw new Error('not implemented'); }
}
module.exports = PasswordHasherPort;
