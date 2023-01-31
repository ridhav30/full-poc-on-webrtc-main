let register = document.getElementById('register')
let registerBtn = document.getElementById('registerBtn')
let whoTocall = document.getElementById('whoTocall')
let whoTocallBtn = document.getElementById('whoTocallBtn')
function sendPeerId() {
    webSocket.send(JSON.stringify({
        target: whoTocall.value,
        data: peerId,
        name: register.value,
        type: 'peerID'
    }))
}
function startCall(peerIdr) {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, function (stream) {
        let selfie = document.getElementById('localVideo')
        videoAndAudio = stream
        selfie.srcObject = stream
        selfie.muted = true
        var call = peer.call(peerIdr, stream);
        call.on('stream', function (remoteStream) {
            let indicate = document.getElementsByClassName('third-row')
            indicate[0].innerHTML = ''
            const remote = document.getElementById('remoteVideo');
            remote.srcObject = remoteStream;
        });
    })
}

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
function callIndicating(fromName, peerId) {
    let indicating = document.getElementsByClassName('third-row')
    console.log(indicating[0]);
    indicating[0].innerHTML = `<h1>you have call from ${fromName}</h1><button onclick="startCall('${peerId}')">accept</button>`
    indicating[1].innerHTML = ''
}
webSocket.onmessage = (event) => {
    let data = JSON.parse(event.data)
    switch (data.type) {
        //to check user already exist or forwarding to register user
        case 'user already exists': alert('user is already exist'); break;
        //to check user online or not.if online there will be create offer
        case 'call_response': data.data === 'user is ready for call' ? sendPeerId() : alert(data.data); break;
        case 'peerID': console.log(data); callIndicating(data.name, data.data); break

    }
};