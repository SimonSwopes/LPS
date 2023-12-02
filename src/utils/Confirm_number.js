export function Generate_Con_number(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const charactersLength = characters.length;
	let confirmationNumber = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		confirmationNumber += characters.charAt(randomIndex);
	}

	return confirmationNumber;
}
