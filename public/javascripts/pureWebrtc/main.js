//globally define for media constrains
var mediaConstraints = {
    optional: [],
    mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    }
};
//to define dom property of local video and remote video
var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');
//globally define stun and turn server
window.iceServers = {
    iceServers: [
        {
            urls: "turn:av.sevenchats.com:3478?transport=tcp",
            username: "admin",
            credential: "sevenchats"
        }
    ]
};
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then(stream => {
    localVideo.srcObject = stream
    localVideo.muted = true
    videoAndAudio = stream
    stream.getTracks().forEach(track => {
        pc.addTrack(track, stream)
    })
})
//globally assign peer connection
var pc = new RTCPeerConnection(window.iceServers);
var videoAndAudio;
webSocket.onopen = e => {
    console.log(e);
}
//peer connection has ontrack function which is listen for remote video (global variable pc)
pc.ontrack = e => {
    remoteVideo.srcObject = e.streams[0]
}
const hideVideoBtn = document.getElementById('hideVideoBtn')
const hideAudioBtn = document.getElementById('hideAudioBtn')
var videoTrue = true
var audioTrue = true
hideVideoBtn.addEventListener('click', () => {
    let videoTrack = videoAndAudio.getTracks().find(track => track.kind === 'video')
    videoTrack.enabled = !videoTrack.enabled
    let videoText = videoTrue ? 'unmute video' : 'mute video'
    hideVideoBtn.innerText = videoText
    videoTrue = !videoTrue

})
hideAudioBtn.addEventListener('click', () => {
    let audioTrack = videoAndAudio.getTracks().find(track => track.kind === 'audio')
    audioTrack.enabled = !audioTrack.enabled
    let audioText = audioTrue ? 'unmute audio' : 'mute audio'
    hideAudioBtn.innerText = audioText
    audioTrue = !audioTrue

})
