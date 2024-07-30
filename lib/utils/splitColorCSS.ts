export function splitColorCSS(colorArray: string[]) {
	const increment = 100 / colorArray.length;
	const values = colorArray.map((color, i) => `${color} ${increment * i}% ${increment * i + increment}%`).join(', ');
	return `-webkit-linear-gradient(-30deg,${values})`;
}
