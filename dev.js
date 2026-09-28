import { createServer } from 'vite';

async function start() {
  try {
    const server = await createServer({
      configFile: false,
      root: process.cwd(),
      server: {
        port: 5180,
        host: true,
        strictPort: false
      }
    });

    await server.listen();
    server.printUrls();
    server.bindCLIShortcuts({ print: true });
  } catch (err) {
    console.error('Error starting Vite dev server:', err);
    process.exit(1);
  }
}

start();
