import { UNIT_OF_WORK } from "@apk_shared/ports/unit-of-work.port";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DrizzleService } from "./drizzle.service";
import { DrizzleUnitOfWorkAdapter } from "./unit-of-work.drizzle.adapter";

@Global()
@Module({
	imports: [ConfigModule],
	providers: [
		DrizzleService,
		{
			provide: UNIT_OF_WORK,
			useClass: DrizzleUnitOfWorkAdapter,
		},
	],
	exports: [DrizzleService, UNIT_OF_WORK],
})
export class DrizzleModule {}
