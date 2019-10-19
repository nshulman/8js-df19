import {LightningElement,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RoleFilter extends LightningElement {
    @track roles = {"exec":false,"decisionmaker":false};

    handleRoleClick(event) {
        this.roles[event.target.className] = !this.roles[event.target.className];
        event.target.variant = this.roles[event.target.className] ? "brand" : "";

        console.log('raising event ' + event.target.className);

        //Raise event with role values
        const changeEvent = new CustomEvent('change', {detail: this.roles});
        this.dispatchEvent(changeEvent);
    }

}