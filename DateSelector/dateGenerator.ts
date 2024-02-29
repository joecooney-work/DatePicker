import {IInputs, IOutputs} from "./generated/ManifestTypes";
import React = require("react");
/**
 * Author: Joe Cooney
 * Company: Microsoft
 * Date: 27.02.2024
 */
export class dateGenerator {
        private yearSelect:HTMLTextAreaElement;
        private monthSelect:HTMLTextAreaElement;
        private daySelect:HTMLTextAreaElement;
    
    static getDayRange(year: number, month: number, container:HTMLDivElement) {
    
        const _year = year;
        const _month = month;    
        let daysInMonth;
    
        if (_month === 2) {
            // Check for leap year
            if ((_year % 4 === 0 && _year % 100 !== 0) || (_year % 400 === 0)) {
                daysInMonth = 29;
            } else {
                daysInMonth = 28;
            }
        } else if ([4, 6, 9, 11].includes(_month)) {
            daysInMonth = 30;
        } else {
            daysInMonth = 31;
        }
        
        this.buildHTMControl(container, daysInMonth);
        
    }
    private static buildHTMControl(container:HTMLDivElement, daysInMonth: number ) {
        // Clear previous options
        container.innerHTML = '';    
        // Populate with new options
        for (let i = 1; i <= daysInMonth; i++) {
            let optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            container.appendChild(optionElement);
        }
    }

}

