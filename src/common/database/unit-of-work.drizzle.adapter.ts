import { IUnitOfWorkPort } from "@apk_shared/ports/unit-of-work.port";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "./drizzle.service";

@Injectable()
export class DrizzleUnitOfWorkAdapter implements IUnitOfWorkPort {
	constructor(private readonly drizzleService: DrizzleService) {}

	async withTransaction<T>(work: (tx: unknown) => Promise<T>): Promise<T> {
		return this.drizzleService.getDb().transaction(async (tx) => {
			return work(tx);
		});
	}
}
