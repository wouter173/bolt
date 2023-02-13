const fetch = require('node-fetch');
const fs = require('fs');

const APP = process.env.APP;
const TOKEN = process.env.TOKEN;
const GUILD = process.env.GUILD;
const endpoint = `https://discord.com/api/v9/applications/${APP}/`;
const url = endpoint + (GUILD != undefined ? `guilds/${GUILD}/commands` : 'commands');

const commands = fs.readdirSync('data/commands');
var cmds = [];

commands.forEach(name => {
	let cmd = fs.readFileSync('data/commands/' + name, 'utf-8');
	cmds.push(JSON.parse(cmd));
});

const headers = {
	Authorization: 'Bot ' + TOKEN,
	'Content-Type': 'application/json',
};

fetch(url, {
	body: JSON.stringify(cmds),
	method: 'PUT',
	headers,
})
	.then(res => res.json())
	.then(data => {
		try {
			console.log(
				data.map(i => i.name),
				'updated.',
			);
		} catch (e) {
			console.log(JSON.stringify(data));
		}
	});
