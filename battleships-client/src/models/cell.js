'use strict';

export default class Cell{
    constructor(element){
        this.isContainBattleship = false;
        this.isExposed = false;
        this.element = element;
    }

    markAsExposed(){
        this.isExposed = true;
        this.element.classList.remove("notExposed");
        this.element.classList.add("exposed")
    }

    markAsContainBattleship(){
        this.isContainBattleship = true;
        this.element.classList.add("battleshipPlaced")
    }

    markAsConsideredOfPlacingBattleship(){
        this.element.classList.add("consideredToContainBattleship")
    }

    markAsLastExposed(){
        this.element.classList.add("lastExposed");
    }

    unmarkAsLastExposed(){
        this.element.classList.remove("lastExposed");
    }
}