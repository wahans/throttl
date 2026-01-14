import express from 'express';
import { seedDefaultPlans } from './services/plans.js';
import plansRouter from './routes/plans.js';
import keysRouter from './routes/keys.js';
import validateRouter from './routes/validate.js';
import webhooksRouter from './routes/webhooks.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/plans', plansRouter);
app.use('/api/keys', keysRouter);
app.use('/api/validate', validateRouter);
app.use('/api/webhooks', webhooksRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Landing page
app.get('/', (_req, res) => {
  res.json({
    name: 'Throttl',
    description: 'API usage tracking made simple',
    endpoints: {
      plans: 'GET /api/plans',
      createKey: 'POST /api/keys',
      getKey: 'GET /api/keys/:id',
      validate: 'POST /api/validate',
      revokeKey: 'DELETE /api/keys/:id',
      webhooks: 'GET/POST /api/webhooks',
    },
    docs: 'https://github.com/wahans/throttl',
  });
});

async function start() {
  await seedDefaultPlans();

  app.listen(port, () => {
    console.log(`Throttl server running on port ${port}`);
  });
}

start().catch(console.error);
