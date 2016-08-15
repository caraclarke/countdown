import {FORM_DIRECTIVES} from "@angular/forms";
import {Component} from "@angular/core";

@Component({
    selector: 'count-down',
    properties: [
        'units',
        'end'
    ],
    directives: [FORM_DIRECTIVES],
    template: `<h1>{{displayString}}</h1>
  <ng-content></ng-content>
  `
})


export class CountDown {
    units:any;
    end:any;
    displayString: string = '';
    constructor() {
        setInterval(()=>this._displayString(), 1);
    }

    _displayString() {

        if (typeof this.units === 'string') {
            this.units = this.units.split('|');
        }


        let dateEnd:any = new Date(this.end);
        let date:any = new Date();

        let dateDifference = dateEnd - date;
        let lastUnit = this.units[this.units.length - 1],
            unitConstantForMillisecs = {
                weeks: (1000 * 60 * 60 * 24 * 7),
                days: (1000 * 60 * 60 * 24),
                hours: (1000 * 60 * 60),
                minutes: (1000 * 60),
                seconds: 1000,
                milliseconds: 1
            },
            unitsLeft = {},
            returnString = '',
            totalMillisecsLeft = dateDifference,
            i:any,
            unit:any;
        for (i in this.units) {
            if (this.units.hasOwnProperty(i)) {

                unit = this.units[i].trim();
                if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
                    //$interval.cancel(countDownInterval);
                    throw new Error('Cannot repeat unit: ' + unit);

                }
                if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
                    throw new Error('Unit: ' + unit + ' is not supported. Please use following units: weeks, days, hours, minutes, seconds, milliseconds');
                }

                unitsLeft[unit] = totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];

                if (lastUnit === unit) {
                    unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
                } else {
                    unitsLeft[unit] = Math.floor(unitsLeft[unit]);
                }
                totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
                unitConstantForMillisecs[unit.toLowerCase()] = false;


                returnString += ' ' + unitsLeft[unit] + ' ' + unit;
            }
        }
        this.displayString = returnString;
    }


}
