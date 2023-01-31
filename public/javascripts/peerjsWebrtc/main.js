var peerId;
const peer = new Peer({
    host: 'av.sevenchats.com',
    port: 9010,
    path: '/av-calls',
    secure:true
    
});
peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    peerId=id
});
var videoAndAudio;
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