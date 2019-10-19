import {LightningElement,track,api} from 'lwc';

export default class RoleUp extends LightningElement {
    @track roles = {};
    @api recordId;

    handleRoleChange(event) {
        console.log('handling change' + JSON.stringify(event.detail));
        let rf = this.template.querySelector("c-opps-by-role");

        rf.roles = event.detail;
        console.log('recordId = ' + this.recordId);
    }

}