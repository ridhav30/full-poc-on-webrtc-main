//creating answer function
function answererPeer(target) {
    //peer connection has icecandidate listner if there is icecandidate then it will expose to other user
    pc.createDataChannel('ourcodeworld-rocks');
    pc.onicecandidate = e => {
        if (e.candidate) {
            console.log(JSON.stringify(e.candidate));
            webSocket.send(JSON.stringify({
                type: "ice_candidate",
                name: register.value,
                data: e.candidate,
                target: target
            }))
        }
    }
    //peer connection has icecandidate state change listner if there is icecandidate state change. i.e. indicating state change of icecandidate
    pc.oniceconnectionstatechange = e => {
        console.log(e);
        
    }
    //peer connection has create answer fn.it will create offer.
    pc.createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    }).then(answer => {
        //the sdp as answer it will set as local descriptions
        pc.setLocalDescription(answer)
        //expose the data to other user
        webSocket.send(JSON.stringify({
            type: "create_answer",
            data: answer,
            target: target
        }));
    })
    let indicate = document.getElementsByClassName('third-row')
    indicate[0].innerHTML = ''

}
function callIndicating(fromName) {
    let indicating = document.getElementsByClassName('third-row')
    console.log(indicating[0]);
    indicating[0].innerHTML = `<h1>you have call from ${fromName}</h1><button onclick="answererPeer('${fromName}')">accept</button>`
    indicating[1].innerHTML = ''
}
