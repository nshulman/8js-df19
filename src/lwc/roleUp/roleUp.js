import {LightningElement,track,api} from 'lwc';

export default class RoleUp extends LightningElement {
    @track roles = {};
    @track band = '';
    @track title = this.baseTitle;
    @api recordId;
    baseTitle = "Opportunities and Key Contacts";

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



    async connectedCallback() {

        function hijo() {
            console.log('hjio');


            let promise = new Promise(function(resolve,reject) {
                setTimeout(function () {
                    resolve('Daft Punk');
                }, 2000)
            });

            promise.then(function(result) {
                console.log('Band: ' + result);
            }).catch(reason => {
                console.log('promise rejected: ' + reason);
            });

        }

        hijo();

        async function getBand(name) {
            return new Promise((resolve,reject) => {
                setTimeout(function () {
                    if (name === 'Nathan') {
                        resolve('Daft Punk');
                    } else if (name === 'Paul') {
                        resolve('Nine Inch Nails');
                    } else {
                        throw new Error(`I don't know anyone else's favorite band`);
                    }

                }, 2000)
            });

        }

        let result = await getBand('Nathan');
        this.band = result;
        result = await getBand('Paul');
        this.band = result;

    }


}
