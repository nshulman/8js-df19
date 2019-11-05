/**
 * Created by Nathan on 10/29/2019.
 */

import {LightningElement,api} from 'lwc';

export default class Greeting extends LightningElement {
    @api
    localGreeting = 'Hello World';
}

















































//     async connectedCallback() {
//         function samples() {
//             let nathansPromise = new Promise(function(resolve,reject) {
//                 setTimeout(function () {
//                     resolve('You will learn something');
//                 }, 2000)
//             });
//
//             let paulsPromise = new Promise(function(resolve,reject) {
//                 setTimeout(function () {
//                     resolve('You will have fun learning');
//                 }, 2000)
//             });
//
//             nathansPromise.then(function(result) {
//                 console.log('Nathan Said: ' + result);
//             }).catch(reason => {
//                 console.log('promise rejected: ' + reason);
//             });
//             // Nathan Said: You will learn something
//
//             paulsPromise.then(function(result) {
//                 console.log('Paul Said: ' + result);
//             }).catch(reason => {
//                 console.log('promise rejected: ' + reason);
//             });
//             // Paul Said: You will have fun learning
//
//             Promise.all([nathansPromise,paulsPromise]).then(function(values) {
//                 console.log(values);
//             });
//             // ["You will learn something","You will have fun learning"]
//         }
//
//         async function getBand(name) {
//             let promise =  new Promise((resolve,reject) => {
//                 setTimeout(function () {
//                     if (name === 'Nathan') {
//                         resolve('Daft Punk');
//                     } else if (name === 'Paul') {
//                         resolve('Nine Inch Nails');
//                     } else {
//                         throw new Error(`I don't know anyone else's favorite band`);
//                     }
//                 }, 2000)
//             });
//             let result = await promise;
//             return result;
//         }
//
//         let result = await getBand('Nathan');
//         this.band = result;
//         result = await getBand('Paul');
//         this.band = result;
//
//     }
//
// }