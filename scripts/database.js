"use strict";
exports.__esModule = true;
var mojang_minecraft_1 = require("mojang-minecraft");
var Database = /** @class */ (function () {
    function Database(DatabaseName) {
        if (!mojang_minecraft_1.world.scoreboard.getObjective('db'))
            mojang_minecraft_1.world.getDimension('overworld').runCommand('scoreboard objective add db dummy');
        this.name = DatabaseName;
        this.updateData();
    }
    Database.prototype.runCommand = function (c, d) {
        if (d === void 0) { d = 'overworld'; }
        return mojang_minecraft_1.world.getDimension(d).runCommand(c);
    };
    Database.prototype.updateData = function () {
        var _this = this;
        mojang_minecraft_1.world.scoreboard.getParticipants().every(function (val) {
            if (val.type == mojang_minecraft_1.ScoreboardIdentityType.fakePlayer) {
                if (val.displayName.startsWith("&".concat(_this.name))) {
                    _this.data = JSON.parse(val.displayName.replace("&".concat(_this.name), '').substring(1, val.displayName.length - 1));
                    return false;
                }
            }
        });
        if (!this.data) {
            this.runCommand("scoreboard players set \"&".concat(this.name, "({})\" db 0"));
            this.data = {};
        }
    };
    Database.prototype.updateDatabase = function () {
        var _this = this;
        mojang_minecraft_1.world.scoreboard.getParticipants().every(function (val) {
            if (val.type == mojang_minecraft_1.ScoreboardIdentityType.fakePlayer) {
                if (val.displayName.startsWith("&".concat(_this.name))) {
                    _this.runCommand("scoreboard players reset &".concat(_this.name, "(").concat(JSON.stringify(_this.data), ") db"));
                    _this.runCommand("scoreboard players set \"&".concat(_this.name, "(").concat(JSON.stringify(_this.data), ")\" db 0"));
                    return false;
                }
            }
        });
    };
    Database.prototype.get = function (key) {
        if (!this.has(key))
            throw new Error("Database does not have key: ".concat(key));
        return this.data[key];
    };
    Database.prototype.set = function (key, value) {
        this.data[key] = value;
        this.updateDatabase();
    };
    Database.prototype.remove = function (key) {
        delete this.data[key];
        this.updateDatabase();
    };
    Database.prototype.has = function (key) {
        if (this.data[key])
            return true;
        return false;
    };
    return Database;
}());
exports["default"] = Database;
