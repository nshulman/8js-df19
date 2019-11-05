/**
 * Created by Nathan on 11/3/2019.
 */

import {LightningElement} from 'lwc';

export default class GreetingContainer extends LightningElement {
    handleClick(event) {
        let greeting = this.template.querySelector("c-greeting");
        console.log(greeting);
        greeting.localGreeting = "Howdy Y'all";
    }


}