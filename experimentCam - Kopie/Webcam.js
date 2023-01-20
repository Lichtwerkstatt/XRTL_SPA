//TODO: 
//* wenn Viewer Fenster schließt oder disconnected, dann überprüfen, ob noch jemand in dem Raum ist (wenn nicht Strema beenden)
//* wenn kein Stream verfügbar Bild oder text einblenden
//* Stream unabhängig machne --> uf raspberry
//* testen, ob das auf Raspberry funktioniert
//* 

console.log("laufe erstmal")
var jwt = require('jsonwebtoken');
var payload = {
    sub: 'webcam',
    component: 'client',
    iat: Date.now(),
    exp: Date.now() + 1800000,
}
var token = jwt.sign(payload, "keysecret");
const io = require("socket.io-client");

const peerConnections ={};

const webcamEmit = async () => {
    const socket = io.connect("http://localhost:7000", { auth: { token: token }, autoConnect: true });
    const contraints = { audio: false, video: { facingMode: "user", width: 640, height: 480 }, };
    const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] }
    const stream = await navigator.mediaDevices.getUserMedia(contraints);

    console.log("connected?")
    const viewer = (viewerId) => {
        const peerConnection = new RTCPeerConnection(config);
        peerConnections[viewerId] = peerConnection;

        peerConnections[peerConnections[viewerId]] = peerConnection;
        let stream = document.getElementById("video").srcObject;

        stream
            .getTracks()
            .forEach(track => peerConnection.addTrack(track, stream));

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', { id: viewerId, data: event.candidate });
            }
        }

        peerConnection
            .createOffer()
            .then((sdp) => peerConnection.setLocalDescription(sdp))
            .then(() => {
                socket.emit('offer', { id: viewerId, data: peerConnection.localDescription })
            });
    }

    const answer = (payload) => {
        try { peerConnections[payload.id].setRemoteDescription(payload.data); }
        catch (e) {
            console.error("Remote answer is in stable state stable!")
        }
    }

    const candidate = (payload) => {
        peerConnections[payload.id].addIceCandidate(new RTCIceCandidate(payload.data))
    }

    const disconnect = (id) => {
        console.log("dis")
        delete peerConnections[id]
    }

    document.getElementById("video").srcObject = stream;

    socket.emit('broadcaster join', 'Cam_1')

    socket.on('viewer', viewer)

    socket.on('answer', answer);

    socket.on('candidate', candidate)

    socket.on('disconnect peerConnection', disconnect)
}

webcamEmit() //function call



