import fs from 'fs';
import path from 'path';

class TemplateRepository {
	private _templateFullName: string;

	TEMPLATE_EXTENSION = '.tpl';

	constructor(templateName: string) {
		this._templateFullName = templateName + this.TEMPLATE_EXTENSION;
	}

	/**
	 * Loads the template and replaces al occurences of {replaces}, returns empty string if
	 * template is not found
	 *
	 * @param replaces, List of variable names and values to replace in the template
	 */
	generate(replaces?: Map<string, string>) {
		const fullFileName = path.resolve(__dirname, this._templateFullName);
		if (!fs.existsSync(fullFileName)) return '';

		let templateString = fs.readFileSync(fullFileName).toString();

		if (replaces) {
			for (let entry of replaces.entries()) {
				const regexp = new RegExp(`{${entry[0]}}`, 'gi');
				templateString = templateString.replace(regexp, entry[1]);
			}
		}
		return templateString;
	}
}

export { TemplateRepository };
