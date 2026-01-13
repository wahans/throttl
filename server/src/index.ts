import express from 'express';
import { seedDefaultPlans } from './services/plans.js';
import plansRouter from './routes/plans.js';
import keysRouter from './routes/keys.js';
import validateRouter from './routes/validate.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/plans', plansRouter);
app.use('/api/keys', keysRouter);
app.use('/api/validate', validateRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  await seedDefaultPlans();

  app.listen(port, () => {
    console.log(`Throttl server running on port ${port}`);
  });
}

start().catch(console.error);
