import path from 'path';
import fs from 'fs';

class TemplateRepository {
	private _templateFullName: string;

	TEMPLATE_EXTENSION = '.tpl';

	constructor(templateName: string) {
		this._templateFullName = templateName;
	}

	/**
	 * Loads the template and replaces al occurences of {replaces}, returns empty string if
	 * template is not found
	 *
	 * @param replaces, List of variable names and values to replace in the template
	 */
	generate(replaces: Map<string, string>) {
		if (!fs.existsSync(this._templateFullName)) return '';

		let templateString = fs.readFileSync(this._templateFullName).toString();

		for (let entry of replaces.entries()) {
			const regexp = new RegExp(`{${entry[0]}}`, 'gi');
			templateString = templateString.replace(regexp, entry[1]);
		}

		return templateString;
	}
}
