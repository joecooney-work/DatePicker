import {IInputs, IOutputs} from "./generated/ManifestTypes";
import React = require("react");
/**
 * Author: Joe Cooney
 * Company: Microsoft
 * Date: 27.02.2024
 */
export class dateGenerator {   
    static getDayControl(year: number, month: number): HTMLSelectElement {    
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
        
        return this.buildDayControl(daysInMonth);
    }
    private static buildDayControl(daysInMonth: number ) : HTMLSelectElement {
        // Clear previous options
        let container = document.createElement("select");   
        // Populate with new options
        for (let i = 1; i <= daysInMonth; i++) {
            let optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            container.appendChild(optionElement);
        }

        return container;
    }
    static getYearControl(numberOfYears: number): HTMLSelectElement {
        // Get the current year
        const currentYear = new Date().getFullYear();
        let year = document.createElement("select");
        
        for (let i = currentYear; i >= currentYear - numberOfYears + 1; i--) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            year.appendChild(optionElement);
        } 
        return year;
    }
    static getMonthControl(): HTMLSelectElement {        
        const numberOfMonths: number = 12;
        const currentYear = 0;
        let month = document.createElement("select");        

        for (let i = currentYear; i < numberOfMonths+1; i++) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            month.appendChild(optionElement);
        }
        return month;
    }
    static getHourControl(): HTMLSelectElement {
        let hour = document.createElement("select");
        const numberOfHours: number = 24;
                
        for (let i = 0; i < numberOfHours+1; i++) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString() + ":00";
            hour.appendChild(optionElement);
        }
        return hour;
    }
}

