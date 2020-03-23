fetch(`${document.currentScript.src}/../alert-modal.html`)
    .then(stream => stream.text())
    .then(textHTML => {
        let parser = new DOMParser();
        return parser.parseFromString(textHTML, 'text/html');
    })
    .then(componentDocument => define(componentDocument));

function define(componentDocument){
    class AlertModal extends HTMLElement {
        constructor() {
            super();
            this.message = null;
            this.onClickOK = null;
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({mode: 'open'});

            // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
            // Current document needs to be defined to get DOM access to imported HTML
            const template = componentDocument.querySelector('#alert-modal-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);

            this.shadowRoot.querySelector(".ok-button").addEventListener('click', this.onClickOK);
            this.render();
        }

        render(){
            this.shadowRoot.querySelector(".message").textContent = this.message;
        }
    }

    customElements.define('alert-modal', AlertModal);
}