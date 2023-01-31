//creating offer function
function offererPeer() {
    //peer connection has icecandidate listner if there is icecandidate then it will expose to other user
    pc.createDataChannel('ourcodeworld-rocks');
    pc.onicecandidate = e => {
        if (e.candidate) {
            console.log(JSON.stringify(e.candidate));
            webSocket.send(JSON.stringify({
                type: "ice_candidate",
                name: register.value,
                data: e.candidate,
                target: whoTocall.value
            }))
        }
    }
    //peer connection has icecandidate state change listner if there is icecandidate state change. i.e. indicating state change of icecandidate
    pc.oniceconnectionstatechange = e => {
        console.log(e);
        let indicating = document.getElementsByClassName('third-row')
        indicating[0].innerHTML=''
        indicating[1].innerHTML=''
    }
    //peer connection has createOffer fn.it will create offer.
    pc.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    }).then(offer => {
        //the sdp as offer it will set as local descriptions
        pc.setLocalDescription(offer)
        //expose the data to other user
        webSocket.send(JSON.stringify({
            name: register.value,
            type: "create_offer",
            target: whoTocall.value,
            data: offer
        }));
    })
}
//defining dom properties for register and calling users
let register = document.getElementById('register')
let registerBtn = document.getElementById('registerBtn')
let whoTocall = document.getElementById('whoTocall')
let whoTocallBtn = document.getElementById('whoTocallBtn')
//action on register button
registerBtn.addEventListener('click', () => {
    webSocket.send(JSON.stringify({
        name: register.value,
        type: 'store_user'
    }))
})
//action on call button
whoTocallBtn.addEventListener('click', () => {
    webSocket.send(JSON.stringify({
        name: register.value,
        target: whoTocall.value,
        type: 'start_call'
    }))
})
//websocket connection listner .it working w.r.t type.there also contain other data w.r.t requirement.
webSocket.onmessage = (event) => {
    let data = JSON.parse(event.data)
    switch (data.type) {
        //to check user already exist or forwarding to register user
        case 'user already exists': alert('user is already exist'); break;
        //to check user online or not.if online there will be create offer
        case 'call_response': data.data === 'user is ready for call' ? offererPeer() : alert(data.data); break;
        //if offer received then sdp set as remote description and create answer 
        case 'offer_received': pc.setRemoteDescription(data.data); callIndicating(data.name); break
        //if answer received then it is able to exchange icecandidate
        case 'answer_received': pc.setRemoteDescription(data.data); break;
        //if candidate get then it will added  as a candidate better one automatically than calling takes place 
        case 'ice_candidate': pc.addIceCandidate(new RTCIceCandidate(data.data)); break;
    }
};