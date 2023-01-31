peer.on('call', function (call) {
    let indicate = document.getElementsByClassName('third-row')
    indicate[0].innerHTML = ''
    indicate[1].innerHTML = ''
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, function (stream) {
        videoAndAudio = stream
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function (remoteStream) {
            const selfie = document.getElementById('localVideo');
            selfie.srcObject = stream;
            const remote = document.getElementById('remoteVideo');
            remote.srcObject = remoteStream;

        });
    })
});