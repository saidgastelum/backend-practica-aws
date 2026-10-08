const express = require('express');
const authMiddleware = require('./authMiddleware');
const { loginUseCase, getProfileUseCase } = require('../../../config/container');

const router = express.Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.post('/auth/login', async (req, res) => {
  try {
    const result = await loginUseCase.execute(req.body || {});
    res.json(result);
  } catch (e) {
    console.warn(`LOGIN_FAILED ip=${req.headers['x-forwarded-for'] || req.ip} user=${(req.body || {}).username || '-'}`);
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try { res.json(await getProfileUseCase.execute(req.auth.sub)); }
  catch (e) { res.status(404).json({ error: 'No encontrado' }); }
});

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Bienvenido ${req.auth.username}`, role: req.auth.role, data: { servidores: 2, vpcs: 2, estado: 'protegido' } });
});

module.exports = router;
