import { world } from "mojang-minecraft";
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js";
import Database from "../database";

const registration = new CommandBuilder()
.setName('has')
.setAliases([])
.setDescription('Has')
.setUsage(['<key: string>'])
.setCancelMessage(true)
.setPrivate(false)
.addInput(input => {
    return input.setName('key').setType('string').setDescription('key for database')
})

CommandHandler.register(registration, (interaction) => {
    const key = interaction.command.getInput('key').getValue()
    const database = new Database('MisledWater79')
    const t = new Date().getTime()
    const value = database.has(key)
    const t2 = new Date().getTime()
    world.getDimension('overworld').runCommand(`say Has key "${key}"? ${value}. Time took ${t2 - t} ms`)
})