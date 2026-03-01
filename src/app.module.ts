import appConfig from "@apk_common/config/app.config";
import ConfigValidator from "@apk_common/config/config.validator";
import databaseConfig from "@apk_common/config/database.config";
import loggerConfig from "@apk_common/config/logger.config";
import redisConfig from "@apk_common/config/redis.config";
import { LoggerModule } from "@apk_common/infra/logger/logger.module";
import { RedisModule } from "@apk_common/infra/redis/redis.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./common/database/database.module";
console.log(`.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`);

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
			load: [appConfig, databaseConfig, loggerConfig, redisConfig],
			validationSchema: ConfigValidator,
		}),
		DatabaseModule,
		LoggerModule,
		RedisModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
