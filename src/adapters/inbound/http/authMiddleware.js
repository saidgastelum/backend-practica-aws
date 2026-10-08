const { tokenService } = require('../../../config/container');

module.exports = function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'Token requerido' });
  try {
    req.auth = tokenService.verify(token);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
