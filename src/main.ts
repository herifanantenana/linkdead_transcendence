import AppConfig from "@apk_common/config/app.config";
import { AppLogger } from "@apk_common/infra/logger/logger.service";
import { ValidationPipe } from "@nestjs/common";
import { type ConfigType, ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
	});
	// set up logger
	const logger = app.get(AppLogger);
	app.useLogger(logger);
	app.flushLogs();

	const appConfig = app.get(ConfigService).get<ConfigType<typeof AppConfig>>("app");
	if (!appConfig) {
		logger.error("App configuration is missing");
		process.exit(1);
	}

	// trust proxy if configured
	if (appConfig.trustProxy) {
		logger.log("Trusting proxy headers");
		app.set("trust proxy", 1);
	} else {
		logger.log("Not trusting proxy headers");
	}

	// set up cors
	const corsOrigin = appConfig.clientUrl ? [appConfig.clientUrl] : "*";
	app.enableCors({
		origin: corsOrigin,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
		preflightContinue: false,
		optionsSuccessStatus: 204,
	});
	logger.log(`CORS enabled for origin: ${Array.isArray(corsOrigin) ? corsOrigin.join(", ") : corsOrigin}`);

	// set global prefix
	const prefix = appConfig.nodeEnv === "production" ? "api" : "dev-api";
	app.setGlobalPrefix(prefix);

	// set up global validation pipe
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	// enable shutdown hooks for graceful shutdown
	app.enableShutdownHooks();

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Linkdead API")
		.setDescription("API documentation for Linkdead application")
		.setVersion("1.0.2")
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	const swaggerPrefix = appConfig.nodeEnv === "production" ? "docs" : "docs-dev";
	SwaggerModule.setup(swaggerPrefix, app, document, {
		swaggerOptions: {
			withCredentials: true,
		},
	});

	await app.listen(appConfig.port, () => {
		logger.log(`API server is running in ${appConfig.nodeEnv} mode`);
	});

	const appDomain = await app.getUrl();
	logger.log(`API server available at: ${appDomain}/${prefix}`);
	logger.log(`API documentation available at: ${appDomain}/${swaggerPrefix}`);
}
void bootstrap();
