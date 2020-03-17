'use strict';
import AlertModal from '../../components/alertModal.js'

export default class DisconnectionHandlers {
    static opponentHasDisconnected(beforeunloadFuncToAbort) {
        new AlertModal("Sorry :(\n"
                + "Your opponent has left the game.\n"
                + "Redirecting to the main screen.", () => {
            window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
            window.location.reload();
        })
    }
}