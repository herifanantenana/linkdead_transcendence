import { DrizzleModule } from "@apk_common/database/drizzle.module";
import databaseEnv from "@apk_common/database/env/database.env";
import appConfig from "@apk_common/env/app.env";
import envValidation from "@apk_common/env/env.validator";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
			load: [appConfig, databaseEnv],
			validationSchema: envValidation,
		}),
		DrizzleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
