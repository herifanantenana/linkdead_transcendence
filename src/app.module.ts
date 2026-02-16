import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import appConfig from "./common/config/app.config";
import envValidation from "./common/config/env.validation";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
			load: [appConfig],
			validationSchema: envValidation,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
