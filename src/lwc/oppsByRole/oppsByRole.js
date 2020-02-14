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
    get selectedRoles() {
        return this._roles;
    };
    set selectedRoles(value) {
        if (value) {
            console.log('recId' + this.recId);
            this._roles = value;
            this.buildTable();
        }
    }
    @track _roles;
    @api helloWorld;

    async getUrl(id) {
        let promise = new Promise((resolve) => {
            this[NavigationMixin.GenerateUrl]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: id,
                    actionName: 'view',
                },
            }).then(url => {
                resolve(url);
            });
        });
        return await promise;
    }

    buildTable() {
        getContactList({recId:this.recId})
            .then(async results => {
                console.log('JSON Results' + JSON.stringify(results));
                let resultData = [];
                for (let i=0;i<results.length;i++) {
                    const role = results[i]["Role"];
                    // let url = '#';
                    //let url = this.getUrl(results[i].OpportunityId);
                    let url = await this.getUrl(results[i].OpportunityId);
                    console.log('URL for this row is: ' + url);
                    let result = {OpportunityUrl:url};
                    Object.assign(result,results[i]);

                    if (this._roles.exec && role === "Executive Sponsor") {
                        // 2 & 3. Dot notation not working.  Use an import to flatten.
                        // resultData.push(result);
                        resultData.push(flatten(result));
                    }
                    if (this._roles.decisionmaker && role === "Decision Maker") {
                        // 2 & 3. Dot notation not working.  Use an import to flatten.
                        // resultData.push(result);
                        resultData.push(flatten(result));
                    }
                }
                this.data = [...resultData];

                //Raise event with role values
                console.log('raising event w ' + this.data.length);

                // DISPATCHEVENT AND CUSTOMEVENT
                const changeEvent = new CustomEvent('change', {detail: this.data.length});
                this.dispatchEvent(changeEvent);

            }).catch(error => {
                console.log('could not get contacts: ' + error.message);
            })
    }

    handleAdd() {

        console.log('A New Row Has been Pushed onto the @tracked data Array');

        const newRow = {"Opportunity.Name":"New Opportunity",
            "Contact.Name":"Alice Greene", "Opportunity.Amount":100000,
            "Role":"Executive Sponsor","Contact.Phone":"512-555-1212",
            "Opportunity.StageName":"Negotiation/Review","OpportunityId":"0063k00000x7l7mAAA",
        "OpportunityUrl":"#"};

        // SPREAD NOTATION
        //this.data.push(newRow);
        // let newArray = this.data;
        // newArray.push(newRow);
        // this.data = newArray.slice();
        this.data = [...this.data, newRow];
    }

    async connectedCallback() {
        console.log('connected: ');
    }
}