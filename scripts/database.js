import { ScoreboardIdentityType, world } from "mojang-minecraft";

export default class Database {

    name;
    data;
    
    constructor(DatabaseName){
        if(!world.scoreboard.getObjective('db')) this.runCommand('scoreboard objectives add db dummy');
        this.name = DatabaseName;
        this.updateData();
    }

    runCommand(c, d = 'overworld'){
        return world.getDimension(d).runCommand(c);
    }

    updateData(){
        world.scoreboard.getParticipants().every((val) => {
            if(val.type == ScoreboardIdentityType.fakePlayer){
                if(val.displayName.startsWith(`&${this.name}`)){
                    this.data = JSON.parse(val.displayName.replace(`&${this.name}`,'').substring(1,val.displayName.length-this.name.length-2));
                    return false;
                }
            }
        })
        if(!this.data){
            this.runCommand(`scoreboard players set "&${this.name}({})" db 0`);
            this.data = {};
        }
    }

    updateDatabase(){
        world.scoreboard.getParticipants().every((val) => {
            if(val.type == ScoreboardIdentityType.fakePlayer){
                if(val.displayName.startsWith(`&${this.name}`)){
                    this.runCommand(`say ${JSON.stringify(this.data)}`)
                    this.runCommand(`scoreboard players reset "&${this.name}(${JSON.stringify(this.data)})" db`);
                    this.runCommand(`scoreboard players set "&${this.name}(${JSON.stringify(this.data)})" db 0`);
                    return false;
                }
            }
        })
    }

    get(key){
        if(!this.has(key)) throw new Error(`Database does not have key: ${key}`);
        return this.data[key];
    }

    set(key, value){
        this.data[key] = value;
        this.updateDatabase();
    }

    remove(key){
        delete this.data[key]
        this.updateDatabase();
    }

    has(key){
        if(this.data[key]) return true;
        return false;
    }
}