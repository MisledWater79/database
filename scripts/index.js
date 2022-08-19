import { World, system } from "mojang-minecraft"
import './classes/manager/EventEmitter.js'
import './commands/import.js'
system.events.beforeWatchdogTerminate.subscribe(data => {
    data.cancel = true
})