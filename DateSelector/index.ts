import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { dateGenerator } from "./dateGenerator";
/**
 * Author: Joe Cooney
 * Company: Microsoft
 * Date: 27.02.2024
 */
export class DateSelector implements ComponentFramework.StandardControl<IInputs, IOutputs> {
   
    //#region Global Vars
    private mycontainer : HTMLDivElement;
    private label: HTMLLabelElement;
    private year: HTMLSelectElement;
    private month: HTMLSelectElement;
    private day: HTMLSelectElement;
    private hour: HTMLSelectElement;
        
    //Context Logic
    private container: HTMLDivElement;
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutPutChanged: () => void;
    private state: ComponentFramework.Dictionary;
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
        //notes
        if (this.context.parameters.dayOnly.raw === 1){
            this.container.style.color = "white";
            this.container.style.backgroundColor = "Grey";        
            this.createContainer();
            this.createLabel();
            this.createYear();
            this.createMonth();
            this.createDay();                        
        } 
        else if (this.context.parameters.dayOnly.raw === 0) {
            this.createContainer();
            this.createLabel();
            this.createYear();
            this.createMonth();
            this.createDay();
            this.createHour();
        }
        else {
            this.container.innerHTML = "you must set the context parameter DayOnly to be either 1 or 0, please update the value and refresh the session.";
        }
        
    }

    private createContainer(): void {
        this.mycontainer = document.createElement('div');      
        this.container.appendChild(this.mycontainer);
    }
    private createLabel(): void {
        //Build container
        this.label = document.createElement("label");
        this.label.innerHTML = "<h3>Date Picker Tool:</h3>";
        this.mycontainer.appendChild(this.label);
    }
    private createYear(): void {
        // Declare and set the number of years        
        this.year = dateGenerator.getYearControl(this.context.parameters.numberOfYears.raw || 100);
        this.mycontainer.appendChild(this.year);
    }
    private createMonth(): void {
        this.month = dateGenerator.getMonthControl();
        this.mycontainer.appendChild(this.month);        
    }
    private createDay(): void {
        this.day = dateGenerator.getDayControl(parseInt(this.year.value), parseInt(this.month.value));
        this.mycontainer.appendChild(this.day);
    }
    private createHour(): void {
        this.hour = dateGenerator.getHourControl();
        this.mycontainer.appendChild(this.hour);
    }

    
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        //todo:
        this.day = dateGenerator.getDayControl(parseInt(this.year.value), parseInt(this.month.value));
        
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
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
