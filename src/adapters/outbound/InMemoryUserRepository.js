const UserRepositoryPort = require('../../application/ports/UserRepositoryPort');
const User = require('../../domain/User');

class InMemoryUserRepository extends UserRepositoryPort {
  constructor(users) {
    super();
    this.users = users.map((u) => new User(u));
  }
  async findByUsername(username) { return this.users.find((u) => u.username === username) || null; }
  async findById(id) { return this.users.find((u) => u.id === id) || null; }
}
module.exports = InMemoryUserRepository;
