export default async (cmd: Command): Promise<Response> => {
	const subcommand = cmd.data.options[0].value as 'start' | 'stop' | 'check';
	switch (subcommand) {
		case 'start':
			var timestamp = await SCORE.get(`timer-${cmd.member.user.id}`);
			if (timestamp) return sendMessage('Timer already running.');

			await SCORE.put(`timer-${cmd.member.user.id}`, Date.now().toString());
			return sendMessage('Starting timer...');

		case 'stop':
			var timestamp = await SCORE.get(`timer-${cmd.member.user.id}`);
			if (!timestamp) return sendMessage('No timer found.');

			await SCORE.delete(`timer-${cmd.member.user.id}`);
			return sendMessage(`:sparkles: _Stopping timer..._ :sparkles: \n :sparkles: _${formatTimeDiff(+timestamp)}_ :sparkles:`);

		case 'check':
			var timestamp = await SCORE.get(`timer-${cmd.member.user.id}`);
			if (!timestamp) return sendMessage('No timer found.');

			return sendMessage(`:sparkles: _${formatTimeDiff(+timestamp)}_ :sparkles:`);
	}
};

const formatTimeDiff = (start: number) => {
	const diff = new Date().getTime() - start;
	const hours = diff / 1000 / 60 / 60;
	const minutes = (diff / 1000 / 60) % 60;
	const seconds = (diff / 1000) % 60;

	return `${formatDigits(hours)}h${formatDigits(minutes)}m${formatDigits(seconds)}s`;
};

const formatDigits = (t: number) => ('00' + t.toFixed(0)).slice(-2);

const sendMessage = (value: string) => {
	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content: value,
			},
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
};
