"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var CountDown = (function () {
    function CountDown() {
        var _this = this;
        this.displayString = '';
        setInterval(function () { return _this._displayString(); }, 1);
    }
    CountDown.prototype._displayString = function () {
        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }
        var dateEnd = new Date(this.end);
        var date = new Date();
        var dateDifference = dateEnd - date;
        var lastUnit = this.units[this.units.length - 1], unitConstantForMillisecs = {
            weeks: (1000 * 60 * 60 * 24 * 7),
            days: (1000 * 60 * 60 * 24),
            hours: (1000 * 60 * 60),
            minutes: (1000 * 60),
            seconds: 1000,
            milliseconds: 1
        }, unitsLeft = {}, returnString = '', totalMillisecsLeft = dateDifference, i, unit;
        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {
                unit = this.units[i].trim();
                if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                    throw new Error('Cannot repeat unit: ' + unit);
                }
                if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit + ' is not supported. Please use following units: weeks, days, hours, minutes, seconds, milliseconds');
                }
                unitsLeft[unit] = totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];
                if (lastUnit === unit) {
                    unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                }
                else {
                    unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }
                totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
                unitConstantForMillisecs[unit.toLowerCase()] = false;
                returnString += ' ' + unitsLeft[unit] + ' ' + unit;
            }
        }
        this.displayString = returnString;
    };
    CountDown = __decorate([
        core_1.Component({
            selector: 'count-down',
            properties: [
                'units',
                'end'
            ],
            directives: [forms_1.FORM_DIRECTIVES],
            template: "<h1>{{displayString}}</h1>\n  <ng-content></ng-content>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CountDown);
    return CountDown;
}());
exports.CountDown = CountDown;
