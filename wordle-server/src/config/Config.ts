import { Config as ConfigShared } from 'wordle-shared/config/Config';
import * as publicIp from 'public-ip';

// Utility function to copy static properties from parent to child class
function copyStaticProperties(childClass: any, parentClass: any): void {
	for (const propertyName in parentClass) {
		if (Object.prototype.hasOwnProperty.call(parentClass, propertyName)) {
			childClass[propertyName] = parentClass[propertyName];
		}
	}
}

export class Config extends ConfigShared {
	public static WordId = -1;
}

// Copy static properties from parent class to child class
copyStaticProperties(Config, ConfigShared);

await (async () => {
	try {
		const ipAddress = await publicIp.publicIpv4();
		Config.wordleIpAddress = '//' + ipAddress;
	} catch (error) {
		console.error(error);
	}
})();
