import {IInputs, IOutputs} from "./generated/ManifestTypes";
import React = require("react");
/**
 * Author: Joe Cooney
 * Company: Microsoft
 * Date: 27.02.2024
 */
export class dateGenerator {   
    static getDayControl(year: number, month: number, className: string): HTMLSelectElement {    
        let daysInMonth;
    
        if (month === 2) {
            // Check for leap year
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                daysInMonth = 29;
            } else {
                daysInMonth = 28;
            }
        } else if ([4, 6, 9, 11].includes(month)) {
            daysInMonth = 30;
        } else {
            daysInMonth = 31;
        }        
        
        return this.buildDayControl(daysInMonth, className);
    }
    private static buildDayControl(daysInMonth: number, className: string) : HTMLSelectElement {
        // Clear previous options
        let container = document.createElement("select");
        container.id = "day";  
        container.className = className; 
        // Populate with new options
        for (let i = 1; i <= daysInMonth; i++) {
            let optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            container.appendChild(optionElement);
        }

        return container;
    }
    static getYearControl(numberOfYears: number, className: string): HTMLSelectElement {
        // Get the current year
        const currentYear = new Date().getFullYear();        
        let year = document.createElement("select");
        year.id = "year";
        year.className = className;
        for (let i = currentYear; i >= currentYear - numberOfYears + 1; i--) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            year.appendChild(optionElement);
        } 
        return year;
    }
    static getMonthControl(className: string): HTMLSelectElement {
        //todo - add month names to each text value.        
        const numberOfMonths: number = 12;
        const currentYear = 1;
        let month = document.createElement("select");
        month.id = "month";
        month.className = className;
        for (let i = currentYear; i <= numberOfMonths; i++) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();            
            month.appendChild(optionElement);
        }
        return month;
    }
    static getHourControl(className: string): HTMLSelectElement {
        let hour = document.createElement("select");
        hour.id = "hour";
        hour.className = className;
        const numberOfHours: number = 24;                
        for (let i = 0; i < numberOfHours+1; i++) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString() + ":00";
            hour.appendChild(optionElement);
        }
        return hour;
    }
    /**
     * Used to set value of HTMLSelectElement within given control.
     * @param control HTML Select control's Id you wish to set the value.
     * @param value value you wish to set your control to.
     * @returns 
     */
    static setControlValue(controlid: string, value: string): void {
        let control: HTMLSelectElement = document.getElementById(controlid) as HTMLSelectElement;
        if (control)             
            control.value = value;        
    }
    static getLabel(text: string): HTMLLabelElement {
        let label = document.createElement("label");
        label.innerHTML = text;
        
        return label;
    }
}

