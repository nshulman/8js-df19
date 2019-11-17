/**
 * Created by Nathan on 11/3/2019.
 */

import {LightningElement,track} from 'lwc';

export default class GreetingContainer extends LightningElement {

    @track
    localeCountry = 'Unknown';
    @track
    localeGreeting = 'Unknown';

    handleClick(event) {
        switch (event.target.label) {
            case 'CH':
                this.localeCountry = 'Switzerland';
                this.localeGreeting = 'Gruezi';
                break;
            case 'PH':
                this.localeCountry = 'Philippines';
                this.localeGreeting = 'Kumusta Ka';
                break;
            case 'TX':
                this.localeCountry = 'Texas';
                this.localeGreeting = 'Howdy';
                break;
        }
    }


}