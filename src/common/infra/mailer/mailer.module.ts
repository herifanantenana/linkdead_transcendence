import { Global, Module } from "@nestjs/common";
import { MailerService } from "./mailer.service";
import { NodeMailerService } from "./node-mailer.service";
import { TemplateMailerService } from "./template.service";
@Global()
@Module({
	providers: [NodeMailerService, TemplateMailerService, MailerService],
	exports: [MailerService],
})
export class MailerModule {}
