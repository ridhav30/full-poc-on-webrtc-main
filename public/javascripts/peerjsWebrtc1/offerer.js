let register = document.getElementById('register')
let registerBtn = document.getElementById('registerBtn')
let whoTocall = document.getElementById('whoTocall')
let whoTocallBtn = document.getElementById('whoTocallBtn')
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
//action on call button
whoTocallBtn.addEventListener('click', () => {
    startCall(whoTocall.value)
})

