class GetProfileUseCase {
  constructor({ userRepository }) { this.userRepository = userRepository; }

  async execute(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('NOT_FOUND');
    return { id: user.id, username: user.username, role: user.role };
  }
}
module.exports = GetProfileUseCase;
