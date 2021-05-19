export default async (cmd: Command): Promise<Response> => {
	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content: `:sparkles: _${cmd.data.options[0].value}_ :sparkles:`,
			},
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
};
