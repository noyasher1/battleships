'use strict';
import AlertModal from '../../components/alertModal.js'
import { alertBeforeUnload, resetGame } from '../../staticMethods/sessionMethods.js';

export default class DisconnectionHandlers {
    static connectionError(serverSocket, beforeunloadFuncToAbort){
        serverSocket.disconnect();
        new AlertModal("Sorry :(\n"
            + "There's not connection with the server."
            + "Please try again later.", () => resetGame(beforeunloadFuncToAbort))
        // new AlertModal("Sorry :(\n"
        //     + "There's not connection with the server."
        //     + "Please try again later.", () => {
        //     window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
        //     window.location.reload();
        // })
    }

    static opponentHasDisconnected(beforeunloadFuncToAbort) {
        new AlertModal("Sorry :(\n"
            + "Your opponent has left the game.\n"
            + "Redirecting to the main screen.", () => resetGame(beforeunloadFuncToAbort))
        // new AlertModal("Sorry :(\n"
        //         + "Your opponent has left the game.\n"
        //         + "Redirecting to the main screen.", () => {
        //     window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
        //     window.location.reload();
        // })
    }
}