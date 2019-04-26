document.addEventListener("DOMContentLoaded", ready);

function ready() {

    var endButton = document.getElementById('endCall');
    var holdCall = document.getElementById('holdCall');
    var startCall = document.getElementById('startCall');
    var notify = document.getElementById('notify');


    var port = chrome.extension.connect({
          name: "Sample Communication"
    });

    endButton.addEventListener("click", function() {
        // simple.hangup();
        port.postMessage({type: "endCall"});
    }, false);

    holdCall.addEventListener("click", function() {
        // simple.hold();
        port.postMessage({type: "holdCall"});
    }, false);

    startCall.addEventListener("click", function() {
        let number = document.getElementById('input-filed_number').value;
        // simple.call("79153979336");
        port.postMessage({type: "startCall", number: number});
    }, false);

    // notify.addEventListener("click", function() {
    //     let notify = document.getElementById('input-filed_notify').value;
    //     // simple.call("79153979336");
    //     port.postMessage({type: "notify", text: notify});
    // }, false);

}