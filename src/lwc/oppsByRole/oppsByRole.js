/**
 * Created by Nathan on 10/18/2019.
 */

import {LightningElement,track,api} from 'lwc';
import getContactList from '@salesforce/apex/OppContactRoleController.getContactList';
import { flatten } from 'c/lwcUtils';

const columns = [
    {label:"Opportunity",fieldName:"Opportunity.Name"},
    {label:"Amount",fieldName:"Opportunity.Amount",type:"currency"},
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
            console.log('valuuu' + value);
            console.log('recId' + this.recId);
            this._roles = value;
            this.buildTable();
        }
    }
    @track _roles;

    buildTable() {
        getContactList({recId:this.recId}).then(results => {
            console.log('id:' + this.recId);
            console.log('something wonderful happened' + JSON.stringify(results));
            this.data = [];
            for (let i=0;i<results.length;i++) {
                const role = results[i]["Role"];
                if (this._roles.exec && role === "Executive Sponsor") {
                    // this.data.push(results[i]);
                    this.data.push(flatten(results[i]));
                }
                if (this._roles.decisionmaker && role === "Decision Maker") {
                    // this.data.push(results[i]);
                    this.data.push(flatten(results[i]));
                }
            }
            // 1. Spread Operator: No data showing from same array reference
            this.data = [...this.data];
            // 2 & 3. Dot notation not working.  Use an import to flatten.
            //this.data = [flatten(this.data)];
        }).catch(error => {
            console.log('could not get contacts');
        })

    }

    connectedCallback() {
        console.log('record???' + this.recordId);
    }


}