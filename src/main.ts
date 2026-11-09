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
    'http://host.docker.internal:3002',
  ]);

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin não permitida: ${origin}`), false);
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
