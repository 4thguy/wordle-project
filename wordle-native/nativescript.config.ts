import { NativeScriptConfig } from '@nativescript/core';

export default {
	id: 'org.nativescript.wordlenative',
	appPath: 'app',
	appResourcesPath: 'App_Resources',
	android: {
		v8Flags: '--expose_gc',
		markingMode: 'none',
	},
	packageManager: 'pnpm',
} as NativeScriptConfig;
