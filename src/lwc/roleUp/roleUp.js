import {LightningElement,track,api} from 'lwc';

export default class RoleUp extends LightningElement {
    @track roles = {};
    @track band = '';
    @track title = this.baseTitle;
    @api recordId;
    baseTitle = "Opportunities and Key Contacts";

    handleRoleChange(event) {
        // The role has been changed, so we need to find the Opps By Role Control
        // then set the roles @api value (public property)

        try {

            // let roleFilter = document.getElementById("oppsByRole");
            let roleFilter = this.template.querySelector("c-opps-by-role");
            roleFilter.roles = event.detail;

        } catch (e) {
            alert('Error setting roleFilter property: ' + e.message);
        }
    }

    handleDataChange(event) {
        console.log('dataChangeEvent');
        if (event.detail > 0) {
            this.title = this.baseTitle + ' (Results: ' + event.detail + ')';
            // let bt = this.baseTitle;
            // const count = event.detail;
            // this.title = `${bt} (Results: ${count})`;
        } else {
            this.title = this.baseTitle;
        }
    }


    async connectedCallback() {
        function samples() {

            let nathansPromise = new Promise(function(resolve,reject) {
                setTimeout(function () {
                    resolve('You will learn something');
                }, 2000)
            });

            let paulsPromise = new Promise(function(resolve,reject) {
                setTimeout(function () {
                    resolve('You will have fun learning');
                }, 2000)
            });

            nathansPromise.then(function(result) {
                console.log('Nathan Said: ' + result);
            }).catch(reason => {
                console.log('promise rejected: ' + reason);
            });
            // Nathan Said: You will learn something

            paulsPromise.then(function(result) {
                console.log('Paul Said: ' + result);
            }).catch(reason => {
                console.log('promise rejected: ' + reason);
            });
            // Paul Said: You will have fun learning

            Promise.all([nathansPromise,paulsPromise]).then(function(values) {
                console.log(values);
            });
            // ["You will learn something","You will have fun learning"]
        }

        async function getBand(name) {
            let promise =  new Promise((resolve,reject) => {
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
            let result = await promise;
            return result;
        }

        let result = await getBand('Nathan');
        this.band = result;
        result = await getBand('Paul');
        this.band = result;

    }


}
