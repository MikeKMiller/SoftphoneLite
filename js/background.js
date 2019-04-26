setTimeout(() => {
    navigator.mediaDevices.getUserMedia({
            audio: true
        })
        .catch(function() {
            chrome.tabs.create({
                url: chrome.extension.getURL("options.html"),
                selected: true
            })
        });
}, 100);


var simple = new SIP.Web.Simple({
    media: {
        remote: {
            audio: new Audio()
        }
    },
    ua: {
        uri: 'xxxxxx',
        wsServers: 'xxxxxx',
        authorizationUser: "xxxxxx",
        password: "xxxxxx",
        stunServers: "xxxxxx"
    }
});

// setTimeout(func, 6000);
// function func() {
//   window.open("popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
// }

simple.on('new', function(e) {
    console.debug(e)
})

simple.on('ringing', function() {
    let options = {
        type: "basic",
        title: "Входящий звонок",
        message: msg.text,
        iconUrl: "image/images.jpg",
        buttons: [{
                title: "Отклонить",
            },
            {
                title: "Принять вызов",
            }
        ]
    }
    chrome.notifications.create("inboundCall", options)
})

chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
    if (notificationId == "inboundCall") {
        if (buttonIndex == 0){
            simple.reject();
        }
        if (buttonIndex == 1){
            simple.answer();
        }
    }
})

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        console.debug(msg);
        if (msg.type == "startCall") {
            simple.call(msg.number);
        }

        if (msg.type == "holdCall") {
            simple.hold();
        }

        if (msg.type == "endCall") {
            simple.hangup();
        }

        // if (msg.type == "notify") {
        //     let options = {
        //         type: "basic",
        //         title: "TEST",
        //         message: msg.text,
        //         iconUrl: "image/images.jpg",
        //         buttons: [{
        //                 title: "Отклонить",
        //             },
        //             {
        //                 title: "Принять вызов",
        //             }
        //         ]
        //     }

        //     chrome.notifications.create("inboundCall", options)
        // }
    });


})