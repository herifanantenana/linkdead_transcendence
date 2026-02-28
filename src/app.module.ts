import appConfig from "@apk_common/config/app.config";
import ConfigValidator from "@apk_common/config/config.validator";
import databaseConfig from "@apk_common/config/database.config";
import { DrizzleModule } from "@apk_common/database/drizzle.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
			load: [appConfig, databaseConfig],
			validationSchema: ConfigValidator,
		}),
		DrizzleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
