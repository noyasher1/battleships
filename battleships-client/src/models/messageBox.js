'use strict';

export default class MessageBox{
    constructor(){
        this.element = document.getElementById("messageBox");
    }

    clear(){
        this.element.innerHTML = '';
    }

    pushMessage(message){

        let messageNode = document.createTextNode(message += '\n');
        this.element.append(messageNode);
    }

    popMessage(){
        let textNodes = this.element.childNodes;
        this.element.removeChild(textNodes[textNodes.length-1]);
    }
}