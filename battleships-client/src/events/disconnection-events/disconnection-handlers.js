'use strict';
import { resetGame } from '../../static-methods/session-methods.js';

export default class DisconnectionHandlers {
    static connectionError(serverSocket){
        serverSocket.disconnect();
        let alertModal = document.createElement("alert-modal");
        alertModal.message = "Sorry :(\n"
            + "There's no connection with the server.\n"
            + "Please try again later.";
        alertModal.onClickOK = resetGame;
        document.body.appendChild(alertModal);
    }

    static opponentHasDisconnected() {
        let alertModal = document.createElement("alert-modal");
        alertModal.message = "Sorry :(\n"
            + "Your opponent has left the game.\n"
            + "Redirecting to the main screen.";
        alertModal.onClickOK = resetGame;
        document.body.appendChild(alertModal);
    }
}