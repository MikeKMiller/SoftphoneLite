document.addEventListener("DOMContentLoaded", ready);

function ready() {
    navigator.mediaDevices.getUserMedia({audio: true})
}