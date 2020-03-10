'use strict';

const lastExposedClass = "last-exposed";

export default class Cell{
    constructor(element){
        this.isContainBattleship = false;
        this.isExposed = false;
        this.element = element;
    }

    markAsExposed(){
        this.isExposed = true;
        this.element.classList.remove("not-exposed");
        this.element.classList.add("exposed")
    }

    markAsContainBattleship(){
        this.isContainBattleship = true;
        this.element.classList.add("battleship-placed")
    }

    markAsConsideredOfPlacingBattleship(){
        this.element.classList.add("considered-to-contain-battleship")
    }

    markAsLastExposed(){
        this.element.classList.add(lastExposedClass);
    }

    unmarkAsLastExposed(){
        this.element.classList.remove(lastExposedClass);
    }
}