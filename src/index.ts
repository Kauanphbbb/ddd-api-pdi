import Fastify from "fastify";
import { errorHandler } from "./infrastructure/http/fastify/errors/ErrorHandler";
import { userRoutes } from "./infrastructure/http/fastify/routes/userRoutes";

async function bootstrap() {
  const app = Fastify();

  app.register(userRoutes);

  app.setErrorHandler(errorHandler);

  await app.listen({ port: 3000 });

  console.log("🚀 Server running at http://localhost:3000");
}

bootstrap();
