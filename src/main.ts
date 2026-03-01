import { AppLogger } from "@apk_common/infra/logger/logger.service";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
	});
	// set up logger
	const logger = app.get(AppLogger);
	app.useLogger(logger);
	app.flushLogs();

	await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
