export default async (cmd: Command): Promise<Response> => {
    const embed: Embed = {
        title: ':kiwi: poll',
        description: `\`\`\`${cmd.data.options[0].value}\`\`\``,
        fields: [{
            name: 'vouched',
            value: '0',
            inline: true
        }, {
            name: 'nope\'d',
            value: '0',
            inline: true
        }, {
            name: 'score',
            value: '0',
            inline: true
        }],
        color: 3092791,
    };

	return new Response(
		JSON.stringify({
			type: 4,
			data: {
				content: '',
				embeds: [embed],
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        style: 3,
                        label: 'vouch',
                        custom_id: 'vouch',
                        emoji: {
                            name: '🥝'
                        }
                    },{
                        type: 2,
                        style: 4,
                        label: 'nope',
                        custom_id: 'unvouch',
                        emoji: {
                            name: '🛑'
                        }
                    }]
                }]
			},
		}),
		{ headers: { 'content-type': 'application/json' } },
	);
};

export const vouch = async (comp: Component, min: boolean): Promise<Response> => {
    var val = (parseInt(comp.message.embeds[0].fields![min? 1: 0].value)) + 1
    var total = parseInt(comp.message.embeds[0].fields![2].value)

	let v = await SCORE.get(comp.message.id)
	let real_v = (v == null? '': v)
	let users = real_v.split(',')

	if (users.includes(comp.member.user.id)) {
		return new Response(JSON.stringify({
			type: 7,
			data: {
				embeds: [comp.message.embeds[0]],
			}
		}), {headers:{'content-type': 'application/json'}})
	}

	users = [...users, comp.member.user.id]
	await SCORE.put(comp.message.id, users.join(','))

    comp.message.embeds[0].fields![min ? 1 : 0].value = val + '';
    comp.message.embeds[0].fields![2].value = (total + (min? -1: 1))+'';


    return new Response(JSON.stringify({
        type: 7,
        data: {
            embeds: [comp.message.embeds[0]],
        }
    }), {headers:{'content-type': 'application/json'}});
}