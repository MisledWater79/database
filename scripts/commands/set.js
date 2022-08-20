import { world } from "mojang-minecraft";
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js";
import Database from "../database";

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
    if(value == 'a'){
        const database = new Database('MisledWater79')
        const t = new Date().getTime()
        database.set(key,{value1: 1,value2: 5.0,value3: "test",value4: true})
        const t2 = new Date().getTime()
        world.getDimension('overworld').runCommand(`say Set key "${key}". Time took ${t2 - t} ms`)
        return;
    }
    const database = new Database('MisledWater79')
    const t = new Date().getTime()
    database.set(key,value)
    const t2 = new Date().getTime()
    world.getDimension('overworld').runCommand(`say Set key "${key}". Time took ${t2 - t} ms`)
})