/**
 * Created by Nathan on 10/29/2019.
 */

import {LightningElement,api} from 'lwc';

export default class Greeting extends LightningElement {
    @api
    localGreeting = 'Hello World';
}