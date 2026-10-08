require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

if (!process.env.JWT_SECRET) { console.error('Falta JWT_SECRET'); process.exit(1); }

const routes = require('./adapters/inbound/http/routes');
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '10kb' }));
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend en puerto ${PORT}`));
