import AppConfig from "@apk_common/config/app.config";
import MailerConfig from "@apk_common/config/mailer.config";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import nodemailer, { Transporter } from "nodemailer";
import { AppLogger } from "../logger/logger.service";

@Injectable()
export class NodeMailerService implements OnModuleInit {
	private readonly logger: AppLogger;
	private transporter?: Transporter;

	constructor(
		private readonly appLogger: AppLogger,
		@Inject(MailerConfig.KEY) private readonly mailerConfig: ConfigType<typeof MailerConfig>,
		@Inject(AppConfig.KEY) private readonly appConfig: ConfigType<typeof AppConfig>,
	) {
		this.logger = appLogger.withContext(NodeMailerService.name);
	}

	private async createTransporter() {
		const { enable, useEthereal, host, devPort, prodPort, user, password } = this.mailerConfig;
		if (!enable) {
			this.logger.warn("Mailer is disabled in configuration. Emails will not be sent.");
			return;
		}

		try {
			if (useEthereal) {
				const test = await nodemailer.createTestAccount();
				this.transporter = nodemailer.createTransport({
					host,
					port: this.appConfig.nodeEnv === "production" ? prodPort : devPort,
					secure: this.appConfig.nodeEnv === "production",
					auth: {
						user: test.user,
						pass: test.pass,
					},
				});
				this.logger.debug(`Ethereal test account created: ${test.user}`);
			} else {
				this.transporter = nodemailer.createTransport({
					host,
					port: this.appConfig.nodeEnv === "production" ? prodPort : devPort,
					secure: this.appConfig.nodeEnv === "production",
					auth: {
						user,
						pass: password,
					},
				});
				this.logger.debug(`SMTP transporter created for host: ${host}`);
			}
			await this.transporter.verify();
			this.logger.debug("Mail transporter verified successfully.");
		} catch (error) {
			this.transporter = undefined;
			this.logger.error(`Failed to create mail transporter ${(error as Error).message}`);
		}
	}

	async onModuleInit() {
		await this.createTransporter();
	}

	public getTransporter() {
		if (!this.transporter) {
			this.logger.warn("Mail transporter is not available. Check configuration and initialization logs.");
		}
		return this.transporter;
	}
}
