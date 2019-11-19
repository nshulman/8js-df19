import {LightningElement,track} from 'lwc';

export default class GreetingContainer extends LightningElement {

    @track
    localeName = 'Unknown';
    @track
    localeGreeting = 'Unknown';

    handleClick(event) {
        switch (event.target.label) {
            case 'CH':
                this.localeName = 'Switzerland';
                this.localeGreeting = 'Gruezi';
                break;
            case 'PH':
                this.localeName = 'Philippines';
                this.localeGreeting = 'Kumusta Ka';
                break;
            case 'TX':
                this.localeName = 'Texas';
                this.localeGreeting = 'Howdy';
                break;
        }
    }


}