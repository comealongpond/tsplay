import Fastify from 'fastify';

export function buildServer() {
  const app = Fastify({ logger: true });

  app.get('/health', async () => ({ status: 'ok' }));
  app.get('/', async (req, reply) => {
    return reply.send({ message: `Hello!` });
  });

  return app;
}
