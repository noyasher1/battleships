const okButtonId = "ok-button";
const contentItemClass = "modal-content-item";

export default class AlertModal{
    constructor(message, funcOnClick){
        AlertModal._createHTML(message);
        AlertModal._addButtonListener(funcOnClick);
    }

    static _createHTML(message){
        let modalDiv = document.createElement("div");
        modalDiv.id = "alert-modal";

        let contentElement = document.createElement("div");
        contentElement.classList.add("modal-content");

        let messageElement = document.createElement("div");
        messageElement.classList.add("modal-message");
        messageElement.classList.add(contentItemClass);
        messageElement.appendChild(document.createTextNode(message));
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

    static _addButtonListener(funcOnClick){
        document.getElementById(okButtonId).addEventListener("click", funcOnClick);
    }
}