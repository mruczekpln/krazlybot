import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'

import pingCommand from './commands/ping.js'

config()

// eslint-disable-next-line no-undef
const { TOKEN } = process.env

export const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()
client.commands.set(pingCommand.data.name, pingCommand)

client.once(Events.ClientReady, c => {
	console.log(`logged in as ${c.user.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return

	const command = interaction.client.commands.get(interaction.commandName)

	if (!command) {
		console.log(`no command matching ${interaction.commandName}`)
		return
	}

	try {
		await command.execute(interaction)
	} catch (err) {
		console.log(err)
		await interaction.reply({
			content: `problem przy wywołaniu komendy ${interaction.commandName}`,
			ephemeral: true
		})
	}
})

client.login(TOKEN)
