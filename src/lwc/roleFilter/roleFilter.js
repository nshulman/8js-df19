import {LightningElement} from 'lwc';

export default class RoleFilter extends LightningElement {
    roles = {"exec":false,"decisionmaker":false};

    handleRoleClick(event) {
        this.roles[event.target.className] = !this.roles[event.target.className];
        event.target.variant = this.roles[event.target.className] ? "brand" : "";

        // DISPATCHEVENT AND CUSTOMEVENT
        // roleFilter.js: Raise event with role values
        const changeEvent = new CustomEvent('change', {detail: this.roles});
         this.dispatchEvent(changeEvent);
    }

}