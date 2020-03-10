'use strict';

export default class DisconnectionHandlers {
    static opponentHasDisconnected(beforeunloadFuncToAbort) {
        if(!alert("Sorry :(\n"
                + "Your opponent has left the game.\n"
                + "Redirecting to the main screen.")){
            window.removeEventListener("beforeunload", beforeunloadFuncToAbort);
            window.location.reload();
        }
    }
}