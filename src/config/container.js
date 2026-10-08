const bcrypt = require('bcryptjs');
const InMemoryUserRepository = require('../adapters/outbound/InMemoryUserRepository');
const BcryptPasswordHasher = require('../adapters/outbound/BcryptPasswordHasher');
const JwtTokenService = require('../adapters/outbound/JwtTokenService');
const LoginUseCase = require('../application/usecases/LoginUseCase');
const GetProfileUseCase = require('../application/usecases/GetProfileUseCase');

const userRepository = new InMemoryUserRepository([
  { id: 1, username: 'said', passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Cambiar123!', 10), role: 'admin' },
]);
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService(process.env.JWT_SECRET, process.env.JWT_EXPIRES || '15m');

module.exports = {
  tokenService,
  loginUseCase: new LoginUseCase({ userRepository, passwordHasher, tokenService }),
  getProfileUseCase: new GetProfileUseCase({ userRepository }),
};
