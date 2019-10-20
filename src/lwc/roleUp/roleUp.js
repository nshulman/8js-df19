import {LightningElement,track,api} from 'lwc';

export default class RoleUp extends LightningElement {
    @track roles = {};
    @api recordId;

    handleRoleChange(event) {
        //let rf = document.getElementById("oppsByRole");
        let rf = this.template.querySelector("c-opps-by-role");
        rf.roles = event.detail;
    }

}