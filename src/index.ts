import { buildServer } from './server';

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

async function main() {
  const app = buildServer();

  // graceful shutdown
  const shutdown = async (signal: string) => {
    app.log.info({ signal }, 'shutting down');
    try {
      await app.close();
      process.exit(0);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`listening on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
