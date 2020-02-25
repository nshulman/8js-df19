import {LightningElement,track,api} from 'lwc';

export default class RoleUp extends LightningElement {
    baseTitle = "Opportunities and Key Contacts";
    @track selectedRoles = {};
    @track title = this.baseTitle;
    @api recordId;
    band = '';

    handleRoleChange(event) {
        // The role has been changed, so we need to find the Opps By Role Control
        // then set the roles @api value (public property)
        try {
            // ****************************************
            // QUERYSELECTOR vs. DOCUMENT.GETELEMENTBYID
            // document.getElementById will NOT work.
            // let roleFilter = document.getElementById("oppsByRole");
            let oppsByRole = this.template.querySelector("c-opps-by-role");
            oppsByRole.recId = this.recordId;
            console.log('About to select roles');
            oppsByRole.selectedRoles = event.detail;

        } catch (e) {
            alert('Error setting roleFilter property: ' + e.message);
        }
    }

    handleDataChange(event) {
        console.log('dataChangeEvent');
        console.log(JSON.stringify(event.detail));
        if (event.detail > 0) {
            // STRING INTERPOLATION / LET / CONST
            // this.title = this.baseTitle + ' (Results: ' + event.detail + ')';
            let base = this.baseTitle;
            const resCount = event.detail;
            this.title = `${base} (Results: ${resCount})`;
        } else {
            this.title = this.baseTitle;
        }
    }

}