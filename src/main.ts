import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = new Set([
    'http://localhost:4000',
    'http://localhost:4200',
    'http://localhost:5002',
    'http://localhost:5173',
    'http://localhost:8000',
    'http://localhost:3002',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3002',
    'http://host.docker.internal:3002',
    'http://host.docker.internal:5173',
  ]);

  const isAllowedOrigin = (origin?: string) => {
    if (!origin) {
      return true;
    }

    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.has(normalizedOrigin)) {
      return true;
    }

    return /^http:\/\/(localhost|127\.0\.0\.1|host\.docker\.internal):\d+$/.test(
      normalizedOrigin,
    );
  };

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin não permitida: ${origin ?? 'desconhecida'}`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(
    `🚀 Help Backend iniciado com sucesso em http://localhost:${port}`,
  );
}
await bootstrap();
