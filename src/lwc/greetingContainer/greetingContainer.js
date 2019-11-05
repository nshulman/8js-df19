/**
 * Created by Nathan on 11/3/2019.
 */

import {LightningElement} from 'lwc';

export default class GreetingContainer extends LightningElement {

    handleClick(event) {

        // Get the c-greeting component and set the localGreeting public property
        let greeting = this.template.querySelector("c-greeting");
        greeting.localGreeting = "Howdy Y'all";
    }


}