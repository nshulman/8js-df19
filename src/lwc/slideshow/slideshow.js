import {LightningElement,track} from 'lwc';

export default class Slideshow extends LightningElement {

    slideIndex = 1;
    slides = ['nature','snow','mountains'];
    captions = ['Beautiful Nature', 'Snowy Snow', 'Majestic Mountains'];

    @track
    dots = [{dotClass:'dot active',key:1},{dotClass:'dot',key:2},{dotClass:'dot',key:3}];

    get currentImageUrl() {
        return this.genImageUrl(this.slides[this.slideIndex - 1]);
    }

    get currentCaption() {
        return this.captions[this.slideIndex - 1];
    }

    get slideLength() {
        return this.slideIndex + ' / ' + this.slides.length;
    }

    genImageUrl(scene) {
        return (`https://www.w3schools.com/howto/img_${scene}_wide.jpg`);
    }

    plusSlides() {
        this.slideIndex++;
        this.showSlides();
    }

    minusSlides() {
        this.slideIndex--;
        this.showSlides();
    }

    handleDotPress(event) {
        this.slideIndex = event.target.dataset.item;
        this.showSlides();
    }

    showSlides() {
        let n = this.slideIndex;
        let i;
        if (n > this.slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = this.slides.length}
        for (i = 0; i < this.slides.length; i++) {
            if (i === (this.slideIndex - 1)) {
                this.dots[i].dotClass = 'dot active';
            } else {
                this.dots[i].dotClass = 'dot';
            }
        }
    }



}