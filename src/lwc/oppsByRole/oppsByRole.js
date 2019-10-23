/**
 * Created by Nathan on 10/18/2019.
 */

import {LightningElement,track,api} from 'lwc';

import getContactList from '@salesforce/apex/OppContactRoleController.getContactList';
import { flatten } from 'c/jsUtils';

const columns = [
    {label:"Opportunity",fieldName:"Opportunity.Name",initialWidth:350},
    {label:"Amount",fieldName:"Opportunity.Amount",type:"currency",initialWidth:150},
    {label:"Stage",fieldName:"Opportunity.StageName"},
    {label:"Contact",fieldName:"Contact.Name"},
    {label:"Role",fieldName:"Role"},
    {label:"Phone",fieldName:"Contact.Phone"},
];

export default class OppsByRole extends LightningElement {
    @track data=[];
    @track columns=columns;
    @api recId;
    @api
    get roles() {
        return this._roles;
    };
    set roles(value) {
        if (value) {
            console.log('recId' + this.recId);
            this._roles = value;
            this.buildTable();
        }
    }
    @track _roles;

    buildTable() {
        getContactList({recId:this.recId})
            .then(results => {
                console.log('JSON Results' + JSON.stringify(results));
                let resultData = [];
                for (let i=0;i<results.length;i++) {
                    const role = results[i]["Role"];
                    if (this._roles.exec && role === "Executive Sponsor") {
                        // 2 & 3. Dot notation not working.  Use an import to flatten.
                        resultData.push(results[i]);
                        // resultData.push(flatten(results[i]));
                    }
                    if (this._roles.decisionmaker && role === "Decision Maker") {
                        // 2 & 3. Dot notation not working.  Use an import to flatten.
                        resultData.push(results[i]);
                        // resultData.push(flatten(results[i]));
                    }
                }
                this.data = resultData;

                //Raise event with role values
                console.log('raising event w ' + this.data.length);

                const changeEvent = new CustomEvent('change', {detail: this.data.length});
                this.dispatchEvent(changeEvent);

            }).catch(error => {
                console.log('could not get contacts');
            })
    }

    handleAdd() {
        // 1. Spread Operator - push does not update in LWC
        console.log('A New Row Has been Pushed onto the @tracked data Array');

        const newRow = {"Opportunity.Name":"Extra Opportunity",
            "Contact.Name":"Alice Greene", "Opportunity.Amount":1,
            "Role":"Executive Sponsor","Contact.Phone":"512-555-1212",
            "Opportunity.StageName":"Negotiation/Review"};
        this.data.push(newRow);
        // this.data = [...this.data, newRow];
    }

    async connectedCallback() {
        console.log('connected: ');
    }
}