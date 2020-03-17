'use strict';
import AlertModal from '../../components/alertModal.js'
import { resetGame } from '../../staticMethods/sessionMethods.js';

export default class DisconnectionHandlers {
    static connectionError(serverSocket){
        serverSocket.disconnect();
        new AlertModal("Sorry :(\n"
            + "There's not connection with the server."
            + "Please try again later.", () => resetGame())
    }

    static opponentHasDisconnected() {
        new AlertModal("Sorry :(\n"
            + "Your opponent has left the game.\n"
            + "Redirecting to the main screen.", () => resetGame())
    }
}