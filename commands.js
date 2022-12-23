import { REST, Routes } from 'discord.js'
import { config } from 'dotenv'
import fs from 'node:fs'
config()

const { TOKEN, GUILD_ID, APP_ID } = process.env

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	await import(`./commands/${file}`).then(command => {
		commands.push(command.default.data.toJSON())
	})
}

console.log(commands)

const rest = new REST({ version: '10' }).setToken(TOKEN)

const main = async () => {
	try {
		console.log('refreshing commands')

		const data = await rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
			body: []
		})

		console.log(`successfully reloaded ${JSON.stringify(data)}`)
	} catch (err) {
		console.log(err)
	}
}

await main()
