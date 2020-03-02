'use strict';

export default class Cell{
    constructor(element){
        this.isContainBattleship = false;
        this.isExposed = false;
        this.element = element;
    }

    markAsContainBattleship(){
        this.isContainBattleship = true;
        this.element.classList.add("battleshipPlaced")
    }

    markAsConsideredOfPlacingBattleship(){
        this.element.classList.add("consideredToContainBattleship")
    }
}