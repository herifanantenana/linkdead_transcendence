import { Global, Module } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { AppLogger } from "./logger.service";
import { WinstonLoggerService } from "./winston.service";

@Global()
@Module({
	providers: [
		WinstonLoggerService,
		{
			provide: WINSTON_MODULE_PROVIDER,
			inject: [WinstonLoggerService],
			useFactory: (winstonLoggerService: WinstonLoggerService) => winstonLoggerService.getLogger(),
		},
		AppLogger,
	],
	exports: [AppLogger],
})
export class LoggerModule {}
