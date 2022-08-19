import { world } from "mojang-minecraft"
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js"
import Database from "../database"

const registration = new CommandBuilder()
.setName('set')
.setAliases([])
.setDescription('Set')
.setUsage(['<key: string>','<value: string>'])
.setCancelMessage(true)
.setPrivate(false)
.addInput(input => {
    return input.setName('key').setType('string').setDescription('key for database')
})
.addInput(input => {
    return input.setName('value').setType('string').setDescription('value for database')
})

CommandHandler.register(registration, (interaction) => {
    const key = interaction.command.getInput('key').getValue()
    const value = interaction.command.getInput('value').getValue()
    const database = new Database('MisledWater79')
    database.set(key,value)
})