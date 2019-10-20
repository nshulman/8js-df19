import {LightningElement,track,api} from 'lwc';

export default class RoleUp extends LightningElement {
    @track roles = {};
    baseTitle = "Opportunities and Key Contacts";
    @track title = this.baseTitle;
    @api recordId;


    handleRoleChange(event) {
        //let rf = document.getElementById("oppsByRole");
        let rf = this.template.querySelector("c-opps-by-role");
        rf.roles = event.detail;
    }

    handleDataChange(event) {
        console.log('dataChangeEvent');
        if (event.detail > 0) {
            this.title = `${this.baseTitle} (Results: ${event.detail})`;
        } else {
            this.title = this.baseTitle;
        }
    }

}