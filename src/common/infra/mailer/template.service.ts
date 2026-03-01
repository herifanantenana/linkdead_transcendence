import MailerConfig from "@apk_common/config/mailer.config";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { AppLogger } from "../logger/logger.service";

@Injectable()
export class TemplateMailerService implements OnModuleInit {
	private readonly logger: AppLogger;
	private cachedTemplates = new Map<string, handlebars.TemplateDelegate>();

	constructor(
		private readonly appLogger: AppLogger,
		@Inject(MailerConfig.KEY) private readonly mailerConfig: ConfigType<typeof MailerConfig>,
	) {
		this.logger = appLogger.withContext(TemplateMailerService.name);
		this.registerPartials();
	}

	onModuleInit() {
		this.logger.debug("TemplateMailerService initialized and partials registered.");
	}

	private registerPartials() {
		const partialsDir = path.join(this.mailerConfig.templateDir, "partials");
		if (!fs.existsSync(partialsDir)) {
			this.logger.warn(`Template directory ${partialsDir} does not exist. Skipping partials registration.`);
			return;
		}

		for (const file of fs.readdirSync(partialsDir)) {
			if (!file.endsWith(".hbs")) continue;
			const partialName = path.basename(file, ".hbs");
			const partialPath = path.join(partialsDir, file);
			const partialContent = fs.readFileSync(partialPath, "utf-8");
			handlebars.registerPartial(partialName, partialContent);
			this.logger.debug(`Registered partial: ${partialName}`);
		}
	}

	private loadTemplate(path: string) {
		const template = this.cachedTemplates.get(path);
		if (template) return template;

		const newTemplate = handlebars.compile(fs.readFileSync(path, "utf-8"));
		this.cachedTemplates.set(path, newTemplate);
		return newTemplate;
	}

	public renderTemplate(templateName: string, context: Record<string, unknown>): string {
		const layoutPath = path.join(this.mailerConfig.templateDir, "layouts", "main.hbs");
		const templatePath = path.join(this.mailerConfig.templateDir, `${templateName}.hbs`);

		const layout = this.loadTemplate(layoutPath);
		const template = this.loadTemplate(templatePath);
		const bodyHtml = template(context);
		return layout({ ...context, body: bodyHtml });
	}
}
