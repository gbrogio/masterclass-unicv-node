import { App } from "./app";
import { config } from "./config";
import { DatabaseService } from "./services/database.service";

async function bootstrap() {
  await new DatabaseService().connect();

  const app = new App();
  app.start(config.port);
}

bootstrap();
