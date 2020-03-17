export function alertBeforeUnload(event){
    event.returnValue = ''; // When changing this value to value other then null or undefined, it prompt the message (in old browsers it prompt tje string set to the property)
}

export function resetGame(){
    window.removeEventListener("beforeunload", alertBeforeUnload);
    window.location.reload();
}