import { world } from "mojang-minecraft"
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js"
import Database from "../database"

const registration = new CommandBuilder()
.setName('remove')
.setAliases([])
.setDescription('Remove')
.setUsage(['<key: string>'])
.setCancelMessage(true)
.setPrivate(false)
.addInput(input => {
    return input.setName('key').setType('string').setDescription('key for database')
})

CommandHandler.register(registration, (interaction) => {
    const key = interaction.command.getInput('key').getValue()
    const database = new Database('MisledWater79')
    database.remove(key)
})