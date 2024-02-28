import {IInputs, IOutputs} from "./generated/ManifestTypes";
import React = require("react");
/**
 * Author: Joe Cooney
 * CO author: Neil Hobson
 * Company: Microsoft
 * Date: 27.02.2024
 */
export default class dateGenerator extends React.Component {
        private yearSelect:HTMLTextAreaElement;
        private monthSelect:HTMLTextAreaElement;
        private daySelect:HTMLTextAreaElement;
    
    public getDayRange(year: number, month: number, container:HTMLDivElement): HTMLDivElement {
    
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
        
        return this.buildHTMControl(container, daysInMonth);
        
    }
    private buildHTMControl(container:HTMLDivElement, daysInMonth: number ): HTMLDivElement {
        // Clear previous options
        container.innerHTML = '';
    
        // Populate with new options
        for (let i = 1; i <= daysInMonth; i++) {
            let optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            container.appendChild(optionElement);
        }

        return container;
    }

}

