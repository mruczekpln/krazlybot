import { SlashCommandBuilder } from 'discord.js'

const commandData = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('odpowiada pong!, służy do testowania działania bota')

const execute = async interaction => {
	await interaction.reply('Pong!')
}

export default {
	data: commandData,
	execute: execute
}
