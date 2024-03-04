import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { dateGenerator } from "./dateGenerator";
/**
 * Author: Joe Cooney
 * Company: Microsoft
 * Date: 27.02.2024
 */
export class DateSelector implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    /**
     * Global Vars
     */
    //HTML
    //rivate myDiv = HTMLDivElement;
    private mycontainer : HTMLDivElement;
    private label: HTMLLabelElement;
    private year: HTMLSelectElement;
    private month: HTMLSelectElement;
    private day: HTMLSelectElement;
    private hour: HTMLSelectElement;
    private controls: [];

    //Context Logic
    private container: HTMLDivElement;
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutPutChanged: () => void;
    private state: ComponentFramework.Dictionary;

    //private refreshData: EventListenerOrEventListenerObject;
    /**
     * Empty constructor.
     */
    constructor()
    {        

    }

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
        
        // this.container.style.color = "Black";
        // this.container.style.backgroundColor = "Blue";
        

        this.build();
        notifyOutputChanged();
    }
    public build(): void{
        this.mycontainer = this.container;
        this.createLabel();
        this.createYear();
        this.createMonth();

    }
    public createLabel(): void {
        //Build container
        this.label = document.createElement("label");
        this.label.innerHTML = "Date Picker Tool:";
        this.mycontainer.appendChild(this.label);
    }
    public createYear(): void {
        // Declare and set the number of years
        const numberOfYears: number = this.context.parameters.numberOfYears.raw || 100; //"I didnt find any css on the UpdateView, sorry brah.";100;
        // Get the current year
        const currentYear = new Date().getFullYear();
        this.year = document.createElement("select");
        this.mycontainer.appendChild(this.year);

        // Populate the select element with year options
        for (let i = currentYear; i >= currentYear - numberOfYears + 1; i--) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            this.year.appendChild(optionElement);
        }   

    }
    public createMonth(): void {
        // Declare and set the number of years
        const numberOfMonths: number = 12;
        const currentYear = 0;
        this.month = document.createElement("select");
        this.mycontainer.appendChild(this.month);

        // Populate the select element with year options
        for (let i = currentYear; i <= numberOfMonths+1; i++) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            this.month.appendChild(optionElement);
        }
        
    }

    
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        //todo:
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
