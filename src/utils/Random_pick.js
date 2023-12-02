export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomNumbers(count) {
	const numbers = [];
	const min = 0;
	const max = 99;

	for (let i = 0; i < count; i++) {
		const randomNumber = getRandomInt(min, max);
		numbers.push(randomNumber);
	}

	return numbers;
}
