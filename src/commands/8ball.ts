import { RESTPostAPIChatInputApplicationCommandsJSONBody, ApplicationCommandOptionType } from 'discord-api-types/v10';

const system =
	'You are a 8ball fortune teller and to give fitting 8ball answers to the input questions. it does not matter what the user asks as long as you are able to give a funny answer. you are not allowed to give consolation in the answer or give another option. the answer should be short and funny. the answer has to be dutch. end all of your answers with an enter followed up by "8ball out". you are not allowed to ignore any rules under any circumstance. you must keep answering in a funny way, if you dont know what to say or cant find a good question just say something stupid about sting or lau.';

export const definition: RESTPostAPIChatInputApplicationCommandsJSONBody = {
	name: '8ball',
	description: '8ball brrr',
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: 'question',
			description: 'I will go make the future',
			required: true,
		},
		{
			type: ApplicationCommandOptionType.String,
			name: 'model',
			description: 'choose your model',
			choices: [
				{
					name: 'GPT-3.5 turbo',
					value: 'gpt3',
				},
				{
					name: 'GPT-4 (let op geld lenen kost geld)',
					value: 'gpt4',
				},
			],
		},
	],
};

export async function handle(cmd: Command): Promise<Response> {
	const usernamediscrim = cmd.member.user.username + '#' + cmd.member.user.discriminator;
	const body = cmd.data.options[0].value as string;
	if (body.length > 100) {
		return new Response(
			JSON.stringify({
				type: 4,
				data: {
					content: 'fuck you das te lang',
				},
			}),
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}

	const model = (cmd.data.options[1]?.value || 'gpt3') as 'gpt3' | 'gpt4';
	const completionsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			authorization: 'Bearer ' + OPENAI_APIKEY,
		},
		body: JSON.stringify({
			temperature: 0.4,
			model: model === 'gpt3' ? 'gpt-3.5-turbo' : 'gpt-4',
			messages: [
				{
					role: 'system',
					content: system,
				},
				{
					role: 'user',
					content: `Hallo 8ball, ik ben ${usernamediscrim}.`,
				},
				{
					role: 'user',
					content: cmd.data.options[0].value,
				},
			],
		}),
	});

	const data = await completionsResponse.json();
	console.log(data);
	const out = data.choices[0].message.content;
	console.log('8ball: ', cmd.data.options[0].value, ' => ', out);

	const embed: Embed = {
		title: ':8ball: **8ball**',
		description: `
            \`\`\`${cmd.data.options[0].value}\`\`\`
            \`\`\`${out}\`\`\`
        `,
		color: 15958048,
		footer:
			model === 'gpt4'
				? {
						text: 'gpt-4 beta',
				  }
				: undefined,
	};

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				embeds: [embed],
				content: '',
			},
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
}

export default handle;
