export function humanize(value: string) {
	// if (typeof value !== 'string') return value;
	const str = value
		.replace(/([a-z\d])([A-Z]+)/g, '$1 $2')
		.replace(/\W|_/g, ' ')
		.trim()
		.toLowerCase();
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}
