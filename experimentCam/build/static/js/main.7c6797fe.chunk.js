(this["webpackJsonpxrtl-spa"]=this["webpackJsonpxrtl-spa"]||[]).push([[0],{146:function(e,n){},148:function(e,n){},162:function(e,n){},164:function(e,n){},192:function(e,n){},194:function(e,n){},195:function(e,n){},200:function(e,n){},202:function(e,n){},221:function(e,n){},233:function(e,n){},236:function(e,n){},253:function(e,n,t){},255:function(e,n,t){"use strict";t.r(n);var c=t(25),i=t(132),o=t.n(i),a=t(74),r=t.n(a),s=t(133),u=t(135),d=t(22),f=function(){var e=t(142),n={sub:"webcam",component:"component",iat:Date.now(),exp:Date.now()+18e5},i=e.sign(n,"keysecret"),o=t(254),a=Object(c.useState)({}),f=Object(u.a)(a,2),l=f[0],m=f[1],p=Object(c.useRef)();return Object(c.useEffect)((function(){(function(){var e=Object(s.a)(r.a.mark((function e(){var n,t,c,a,s,u,d,f;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.connect("http://10.232.37.40:7000",{auth:{token:i},autoConnect:!0}),t={audio:!1,video:{facingMode:"user",width:640,height:480}},c={iceServers:[{urls:["stun:stun.l.google.com:19302"]}]},e.next=5,navigator.mediaDevices.getUserMedia(t);case 5:return a=e.sent,s=function(e){var t=new RTCPeerConnection(c);l[e]=t,m(l[e]=t);var i=document.getElementById("video").srcObject;i.getTracks().forEach((function(e){return t.addTrack(e,i)})),t.onicecandidate=function(t){t.candidate&&n.emit("candidate",{id:e,data:t.candidate})},t.createOffer().then((function(e){return t.setLocalDescription(e)})).then((function(){n.emit("offer",{id:e,data:t.localDescription})}))},u=function(e){try{l[e.id].setRemoteDescription(e.data)}catch(n){console.error("Remote answer is in stable state stable!")}},d=function(e){l[e.id].addIceCandidate(new RTCIceCandidate(e.data))},f=function(e){delete l[e]},document.getElementById("video").srcObject=a,n.emit("broadcaster join","Cam_1"),n.on("viewer",s),n.on("answer",u),n.on("candidate",d),n.on("disconnect peerConnection",f),e.abrupt("return",(function(){n.removeAllListeners("viewer",s),n.removeAllListeners("answer",u),n.removeAllListeners("candidate",d),n.removeAllListeners("disconnect peerConnection",f)}));case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(d.jsx)("div",{children:Object(d.jsx)("video",{id:"video",autoPlay:!0,playsInline:!0,ref:p})})};t(253);o.a.render(Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(f,{})}),document.getElementById("root"))}},[[255,1,2]]]);
//# sourceMappingURL=main.7c6797fe.chunk.js.map