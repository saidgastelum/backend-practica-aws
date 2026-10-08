const jwt = require('jsonwebtoken');
const TokenServicePort = require('../../application/ports/TokenServicePort');

class JwtTokenService extends TokenServicePort {
  constructor(secret, expiresIn = '15m') { super(); this.secret = secret; this.expiresIn = expiresIn; }
  sign(payload) { return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn, algorithm: 'HS256' }); }
  verify(token) { return jwt.verify(token, this.secret, { algorithms: ['HS256'] }); }
}
module.exports = JwtTokenService;
