export class KeyboardLayouts {
	static LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i).toLowerCase());
	static ALPHABETICAL = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'line-break-1',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		'line-break-2',
		'enter',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
		'del',
	];
	static QWERTY = [
		'q',
		'w',
		'e',
		'r',
		't',
		'y',
		'u',
		'i',
		'o',
		'p',
		'line-break-1',
		'a',
		's',
		'd',
		'f',
		'g',
		'h',
		'j',
		'k',
		'l',
		'line-break-2',
		'enter',
		'z',
		'x',
		'c',
		'v',
		'b',
		'n',
		'm',
		'del',
	];
}