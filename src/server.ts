import Fastify from 'fastify';

export function buildServer() {
  const app = Fastify({ logger: true });

  app.get('/health', async () => ({ status: 'ok' }));
  app.get('/hello', async (req, reply) => {
    const name = (req.query as { name?: string })?.name ?? 'world';
    return reply.send({ message: `Hello, ${name}!` });
  });

  return app;
}
