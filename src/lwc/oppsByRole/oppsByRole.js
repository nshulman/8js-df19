import {LightningElement,track,api} from 'lwc';

import getContactList from '@salesforce/apex/OppContactRoleController.getContactList';
import {NavigationMixin} from 'lightning/navigation';
import { flatten } from 'c/jsUtils';

const columns = [
    {type:"url",label:"Opportunity",fieldName:"OpportunityUrl",initialWidth:350,
        typeAttributes:{label: {fieldName: "Opportunity.Name"}}},
    {label:"Amount",fieldName:"Opportunity.Amount",type:"currency",initialWidth:150},
    {label:"Stage",fieldName:"Opportunity.StageName"},
    {label:"Contact",fieldName:"Contact.Name"},
    {label:"Role",fieldName:"Role"},
    {label:"Phone",fieldName:"Contact.Phone"},
];

export default class OppsByRole extends NavigationMixin(LightningElement) {
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

    async getUrl(id) {
        console.log('lol'+id);
        let promise = new Promise((resolve,reject) => {
            this[NavigationMixin.GenerateUrl]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: id,
                    actionName: 'view',
                },
            }).then(url => {
                console.log('ugfr'+url);
                resolve(url);
            });
        })
        let result = await promise;
        return result;
    }

    async buildTable() {
        getContactList({recId:this.recId})
            .then(async results => {
                console.log('JSON Results' + JSON.stringify(results));
                let resultData = [];
                for (let i=0;i<results.length;i++) {
                    const role = results[i]["Role"];
                    // let url = '#';
                    // let url = this.getUrl(results[i].OpportunityId);
                    let url = await this.getUrl(results[i].OpportunityId);
                    console.log(url);
                    let res = {OpportunityUrl:url};
                    Object.assign(res,results[i]);

                    //Object.defineProperty(res,'OpportunityUrl', {enumerable:true,configurable:true,writable:true});

                    //res.OpportunityUrl=url;
                    if (this._roles.exec && role === "Executive Sponsor") {
                        // 2 & 3. Dot notation not working.  Use an import to flatten.
                        // resultData.push(res);
                        resultData.push(flatten(res));
                    }
                    if (this._roles.decisionmaker && role === "Decision Maker") {
                        // 2 & 3. Dot notation not working.  Use an import to flatten.
                        // resultData.push(results[i]);
                        resultData.push(flatten(res));
                    }
                }
                this.data = [...resultData];

                //Raise event with role values
                console.log('raising event w ' + this.data.length);

                const changeEvent = new CustomEvent('change', {detail: this.data.length});
                this.dispatchEvent(changeEvent);

            }).catch(error => {
                console.log('could not get contacts: ' + error.message);
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