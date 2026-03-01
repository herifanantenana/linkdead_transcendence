import appConfig from "@apk_common/config/app.config";
import ConfigValidator from "@apk_common/config/config.validator";
import databaseConfig from "@apk_common/config/database.config";
import loggerConfig from "@apk_common/config/logger.config";
import { LoggerModule } from "@apk_common/infra/logger/logger.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./common/database/database.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
			load: [appConfig, databaseConfig, loggerConfig],
			validationSchema: ConfigValidator,
		}),
		DatabaseModule,
		LoggerModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
