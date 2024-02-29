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
    private body = HTMLDivElement;
    private dateselector:HTMLTextAreaElement;
    private label:HTMLLabelElement;
    //Logic
    private container:HTMLDivElement;
    private currentDateTime:HTMLTimeElement;
    private context:ComponentFramework.Context<IInputs>;
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

        //this.body = document.createElement("div");
        // this.container.style.height = context.parameters.customHeight.raw || "240";
        // this.container.style.width = context.parameters.customWidth.raw || "240";
        this.container.style.color = "Black";
        this.container.style.backgroundColor = "Blue";
        

        this.createLabel();
        this.createSelectors();
        dateGenerator.getDayRange(2024, 2, this.container);
        notifyOutputChanged();
    }
    public createLabel(): void {
        //Build container
        this.label = document.createElement("label");
        this.label.innerHTML = "Date Picker Tool:";
        this.container.appendChild(this.label);
    }
    public createSelectors(): void {
        

        // Declare and set the number of years
        const numberOfYears = 100;

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Populate the select element with year options
        for (let i = currentYear; i >= currentYear - numberOfYears + 1; i--) {
            const optionElement = document.createElement('option');
            optionElement.value = i.toString();
            optionElement.text = i.toString();
            this.container.appendChild(optionElement);
        }
    }
    
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
        //this.label.innerHTML = context.parameters.customCSSURL.raw || "";//label
        this.container.innerHTML = context.parameters.customCSSURL.raw || "I didnt find any css on the UpdateView, sorry brah.";//container
        this.container.style.height = context.parameters.customHeight.raw || "140";
        this.container.style.width = context.parameters.customWidth.raw || "140";

        dateGenerator.getDayRange(2024, 2, this.container);
        this.notifyOutPutChanged();
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
