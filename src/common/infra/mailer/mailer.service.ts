import MailerConfig from "@apk_common/config/mailer.config";
import { Inject, Injectable } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { AppLogger } from "../logger/logger.service";
import { NodeMailerService } from "./node-mailer.service";
import { TemplateMailerService } from "./template.service";

@Injectable()
export class MailerService {
	private readonly logger: AppLogger;
	constructor(
		private readonly nodeMailerService: NodeMailerService,
		private readonly templateService: TemplateMailerService,
		private readonly appLogger: AppLogger,
		@Inject(MailerConfig.KEY) private readonly mailerConfig: ConfigType<typeof MailerConfig>,
	) {
		this.logger = appLogger.withContext(MailerService.name);
	}

	private async sendTemplateEmail(to: string, subject: string, templateName: string, context: Record<string, unknown>) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(to)) {
			this.logger.error(`Invalid recipient email address: "${to}". Email will not be sent.`);
			return;
		}
		const transporter = this.nodeMailerService.getTransporter();
		if (!this.mailerConfig.enable || !transporter) {
			this.logger.warn("Mailer is disabled or transporter is not available. Email will not be sent.");
			return;
		}
		try {
			const html: string = this.templateService.renderTemplate(templateName, context);
			const info = (await transporter.sendMail({
				from: this.mailerConfig.from,
				to,
				subject,
				html,
			})) as unknown as SMTPTransport.SentMessageInfo;

			const previewUrl = nodemailer.getTestMessageUrl(info);
			if (previewUrl) {
				this.logger.debug(`Email preview URL: ${previewUrl}`);
			}
			this.logger.debug(`Email sent to ${to} with subject "${subject}"`);
		} catch (error) {
			console.log(error);

			this.logger.error(`Failed to send email to ${to}: ${(error as Error).message}`);
		}
	}

	public async sendTestEmail() {
		await this.sendTemplateEmail("herifanantenana17@gmail.com", "Test Email", "verify-email", {
			username: "Herifananatanana",
			verifyUrl: "https://example.com/verify",
		});
	}
}
