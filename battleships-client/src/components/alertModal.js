const okButtonId = "ok-button";
const contentItemClass = "modal-content-item";

export default class AlertModal{
    constructor(message, funcOnClick){
        this.message = message;
        this.element = this.createHTML();
        this.okButtonElement = document.getElementById(okButtonId);
        this.addButtonListener(funcOnClick);
    }

    createHTML(){
        let modalDiv = document.createElement("div");
        modalDiv.id = "alert-modal";

        let contentElement = document.createElement("div");
        contentElement.classList.add("modal-content");

        let messageElement = document.createElement("div");
        messageElement.classList.add("modal-message");
        messageElement.classList.add(contentItemClass);
        messageElement.appendChild(document.createTextNode(this.message));
        contentElement.appendChild(messageElement);

        let okButton = document.createElement("button");
        okButton.id = okButtonId;
        okButton.classList.add(contentItemClass);
        okButton.appendChild(document.createTextNode("OK"));
        contentElement.appendChild(okButton);

        modalDiv.appendChild(contentElement);
        document.body.appendChild(modalDiv);
        return modalDiv;
    }

    addButtonListener(funcOnClick){
        this.okButtonElement.addEventListener("click", funcOnClick);
    }
}