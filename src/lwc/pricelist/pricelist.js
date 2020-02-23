import {LightningElement,track} from 'lwc';
import getFeaturedItems from '@salesforce/apex/FeaturedItemController.getFeaturedItems';

export default class Pricelist extends LightningElement {
    @track
    prices = [];

    connectedCallback() {
        getFeaturedItems()
            .then(results => {
                this.prices = [];
                results.forEach( x => {
                    let price = {...x};
                    price.divClass = (x.Product2.Highlight__c === true) ? 'highlight' : 'header';
                    console.log(price.divClass);
                    this.prices.push(price);
                    console.log(price);
                });
                console.log('DATA:' + JSON.stringify(this.prices));
            })
            .catch(e => {
                console.log('error setting price columns: ' +  e);
            });
    }


}