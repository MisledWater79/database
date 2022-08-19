import { Scoreboard, ScoreboardIdentityType, world } from "mojang-minecraft";

export default class Database {

    private name: string;
    private data: Object;
    
    constructor(DatabaseName: string){
        if(!world.scoreboard.getObjective('db')) world.getDimension('overworld').runCommand('scoreboard objective add db dummy');
        this.name = DatabaseName;
        this.updateData();
    }

    private runCommand(c: string, d: string = 'overworld'): Object{
        return world.getDimension(d).runCommand(c);
    }

    private updateData(): void{
        world.scoreboard.getParticipants().every((val) => {
            if(val.type == ScoreboardIdentityType.fakePlayer){
                if(val.displayName.startsWith(`&${this.name}`)){
                    this.data = JSON.parse(val.displayName.replace(`&${this.name}`,'').substring(1,val.displayName.length-1));
                    return false;
                }
            }
        })
        if(!this.data){
            this.runCommand(`scoreboard players set "&${this.name}({})" db 0`);
            this.data = {};
        }
    }

    private updateDatabase(): void{
        world.scoreboard.getParticipants().every((val) => {
            if(val.type == ScoreboardIdentityType.fakePlayer){
                if(val.displayName.startsWith(`&${this.name}`)){
                    this.runCommand(`scoreboard players reset &${this.name}(${JSON.stringify(this.data)}) db`);
                    this.runCommand(`scoreboard players set "&${this.name}(${JSON.stringify(this.data)})" db 0`);
                    return false;
                }
            }
        })
    }

    public get(key: string): any{
        if(!this.has(key)) throw new Error(`Database does not have key: ${key}`);
        return this.data[key];
    }

    public set(key: string, value: any): void{
        this.data[key] = value;
        this.updateDatabase();
    }

    public remove(key: string): void{
        delete this.data[key]
        this.updateDatabase();
    }

    public has(key: string): boolean{
        if(this.data[key]) return true;
        return false;
    }
}