import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { dateGenerator } from "./dateGenerator";
/**
 * Author: Joe Cooney
 * Company: Microsoft
 * Date: 27.02.2024
 */
export class DateSelector implements ComponentFramework.StandardControl<IInputs, IOutputs> {
   
    //#region Vars
    //Context Logic
    private container: HTMLDivElement;
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutPutChanged: () => void;//to notify form of control change...    
    private state: ComponentFramework.Dictionary;
    
    //Global Vars 
    private mycontainer : HTMLDivElement;
    private titleDateSelector: HTMLLabelElement;
    private year: HTMLSelectElement;
    private month: HTMLSelectElement;
    private day: HTMLSelectElement;
    private hour: HTMLSelectElement;
    private setValueButton: HTMLButtonElement;
    private dayAndTimeValue: Date;
    private isDateOnly: boolean;  
    private defaultYears: number = 100;  
    private calculateNewDay = () =>  {
        let monthvalue = parseInt((document.getElementById("month") as HTMLSelectElement).value);
        let yearvalue = parseInt((document.getElementById("year") as HTMLSelectElement).value);
        let newDay = dateGenerator.getDayControl(yearvalue, monthvalue);
        let oldDay = document.getElementById("day");
        oldDay?.replaceWith(newDay);
    };
    private callSet = () => {        
        const year = parseInt((document.getElementById("year") as HTMLSelectElement).value);
        const month = parseInt((document.getElementById("month") as HTMLSelectElement).value);
        const day = parseInt((document.getElementById("day") as HTMLSelectElement).value);
        const hour = this.isDateOnly ? 0 : parseInt((document.getElementById('hour') as HTMLSelectElement).value);
        // Validate the values
        if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour)) {
            alert('Please select valid values for all controls');
        } else {
            // Create the DateTime value            
            const dayAndTimeValue = new Date(year, month - 1, day, hour);
            this.dayAndTimeValue = dayAndTimeValue;
            this.notifyOutPutChanged();//Save Data
        }
    };
    //#endregion 

    //#region Constructor
    constructor()
    {

    }
    //#endregion
    
    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {        
        //#region - control initialization code 
        this.context = context;
        this.notifyOutPutChanged = notifyOutputChanged;
        this.state = state;
        this.container = container;
        //#endregion 
        this.createForm();
        this.loadFormValue();
        this.formatForm();        
    }
    private createForm(): void {
        this.isDateOnly = this.context.parameters.isDayOnly.raw;
        this.createContainer();
        this.createTitle();                
        this.createYear();
        this.createMonth();
        this.createDay();
        this.createHour();
        this.createSetButton();
    }
    private createContainer(): void {
        this.mycontainer = document.createElement('div');
        this.mycontainer.id = "mycontainer";
        this.mycontainer.style.alignContent = "center";//horizontal alignment change.      
        this.container.appendChild(this.mycontainer);
    }
    private createTitle(): void {
        const message = "<h3>Date "+ (!this.isDateOnly ? "And Time" : "") +" Picker Tool:</h3>";
        this.titleDateSelector = dateGenerator.getLabel(message);
        this.titleDateSelector.id = "titleDateSelector";
        this.mycontainer.appendChild(this.titleDateSelector);
    }
    private createYear(): void {   
        this.year = dateGenerator.getYearControl(this.context.parameters.numberOfYears.raw || this.defaultYears);
        this.year.id = "year";
        this.year.addEventListener("change", this.calculateNewDay);
        this.mycontainer.appendChild(this.year);        
    }
    private createMonth(): void {
        this.month = dateGenerator.getMonthControl();
        this.month.id = "month";                       
        this.month.addEventListener("change", this.calculateNewDay);     
        this.mycontainer.appendChild(this.month);        
    }
    private createDay(): void {
        this.day = dateGenerator.getDayControl(parseInt(this.year.value), parseInt(this.month.value));        
        this.mycontainer.appendChild(this.day);
    }
    private createHour(): void {
        this.hour = dateGenerator.getHourControl();
        this.hour.id = "hour";        
        if(this.isDateOnly) 
            this.hour.style.setProperty("display", "none");
        this.mycontainer.appendChild(this.hour);
    }
    private createSetButton(): void {
            this.setValueButton = document.createElement("button");
            this.setValueButton.id = "setbutton";            
            this.setValueButton.innerText = "Set Time";
            this.setValueButton.addEventListener("click", this.callSet);
            this.mycontainer.appendChild(this.setValueButton);           
    } 
    private loadFormValue(): void {
        const time = this.context.parameters.dayAndTimeOutputValue.raw;
        if (time == null) return;        
        const year: number = this.context.parameters.dayAndTimeOutputValue.raw?.getFullYear() || 0;
        const month: number = this.context.parameters.dayAndTimeOutputValue.raw?.getMonth() || 0;        
        const day = this.context.parameters.dayAndTimeOutputValue.raw?.getDate() || 0;
        const hour = this.context.parameters.dayAndTimeOutputValue.raw?.getHours() || 0;
        
        dateGenerator.setControlValue("year", year.toString() || "0");
        dateGenerator.setControlValue("month", (month + 1).toString() || "0");//getMonth is 0 based.
        this.calculateNewDay();//set day control based on month/year values
        dateGenerator.setControlValue("day", day.toString() || "0");
        dateGenerator.setControlValue("hour", hour.toString() || "0");
    }
   
    private formatForm(): void {
        if (!this.isDateOnly){
            this.container.style.color = "white";
            this.container.style.backgroundColor = "Grey";

        } 
        else if (this.isDateOnly) {
            this.container.style.backgroundColor = "lightgrey";            
        }
        else {
            this.container.innerHTML = "you must set the context parameter DayOnly to be either 1 or 0, please update the value and refresh the session.";
        }
    }
    
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        
    }
    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {
            dayAndTimeOutputValue: this.dayAndTimeValue
        };
    }
    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
