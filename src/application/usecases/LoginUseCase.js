class LoginUseCase {
  constructor({ userRepository, passwordHasher, tokenService }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute({ username, password }) {
    if (!username || !password) throw new Error('INVALID_CREDENTIALS');
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error('INVALID_CREDENTIALS');
    const ok = await this.passwordHasher.compare(password, user.passwordHash);
    if (!ok) throw new Error('INVALID_CREDENTIALS');
    const token = this.tokenService.sign({ sub: user.id, username: user.username, role: user.role });
    return { token, user: { id: user.id, username: user.username, role: user.role } };
  }
}
module.exports = LoginUseCase;
