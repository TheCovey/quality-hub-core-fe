import React from 'react';
import socketIOClient from 'socket.io-client';
import '../Meeting.scss';
import Draggable from 'react-draggable';

const Room = (props) => {

	let io = socketIOClient.connect('https://qh-test-web-rtc.herokuapp.com');
	let ROOM = `${props.unique}z`;
	let SIGNALING_ROOM = props.unique;
	let configuration = {
		iceServers: [
			{
				url: 'stun:stun.l.google.com:19302',
			},
		],
	};
	let rtcPeerConn;
	let constraints = {
		audio: true,
		video: {
			mandatory: {
				minWidth: 750,
				maxWidth: 750,
				minHeight: 500,
				maxHeight: 500,
			},
		},
	};

	var videoProps = {
		mandatory: {
			minWidth: 750,
			maxWidth: 750,
			minHeight: 500,
			maxHeight: 500,
		},
	};

	function onError(error) {
		console.log('Error!', error);
	}

	function startSignaling() {
		displaySignalingMessage('staring signaling...');

		rtcPeerConn = new RTCPeerConnection(configuration);
		// console.log(rtcPeerConn);
		// rtcPeerConn = new webkitRTCPeerConnection(configuration)

		rtcPeerConn.onicecandidate = function(event) {
			if (event.candidate) {
				io.emit('signal', {
					type: 'ice candidate',
					message: JSON.stringify({
						candidate: event.candidate,
						room: SIGNALING_ROOM,
					}),
				});
			}
			displaySignalingMessage('completed that ice candidate...');
		};

		rtcPeerConn.onnegotiationneeded = function() {
			displaySignalingMessage('on negotiation called');
			rtcPeerConn.createOffer(sendLocalDesc, logError);
		};

		rtcPeerConn.onaddstream = function(event) {
			console.log('on add stream');
			displaySignalingMessage('going to add their stream...');
            document.querySelector('#theirVideoTag').srcObject = event.stream;
            console.log('')
		};

		navigator.mediaDevices.getUserMedia =
			navigator.mediaDevices.getUserMedia ||
			navigator.mediaDevices.webkitGetUserMedia ||
			navigator.mediaDevices.mozGetUserMedia;
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(stream => {
				document.querySelector('#myVideoTag').srcObject = stream;
				rtcPeerConn.addStream(stream);
				document.querySelector('#myVideoTag').play();

				// console.log("Success! We have a stream!");
			})
			.catch(onError);
	}

	function sendLocalDesc(desc) {
		rtcPeerConn.setLocalDescription(
			desc,
			function() {
				displaySignalingMessage('sending local description');
				io.emit('signal', {
					type: 'SDP',
					message: JSON.stringify({
						sdp: rtcPeerConn.localDescription,
					}),
					room: SIGNALING_ROOM,
				});
			},
			logError,
		);
	}

	function logError(error) {
		displaySignalingMessage(error.name + ': ' + error.message);
	}

	function displayMessage(message) {
		let newMessage = message;
		let charAmmount = 40
		let amount = Math.floor(message.length/charAmmount);
		if(amount > 0){
			for(let i=amount; i>0; i--){
				newMessage = newMessage.slice(0, i*charAmmount) + '-\r\n' + newMessage.slice(i*charAmmount);
			}
		} 
		document.querySelector('#chatArea').textContent += '\r\n' + newMessage;
		document
			.querySelector('#chatArea')
			.setAttribute('style', 'white-space: pre;');
		document.querySelector('#chatArea').scrollTop = 10000000;
		// chatArea.textContent = chatArea.textContent + "<br/>" + message;
	}

	function displaySignalingMessage(message) {
		// console.log(message)
		// signalingArea.setAttribute('style', 'white-space: pre;');
		// signalingArea.textContent += '\r\n' + message;
	}

	function restartStream() {
		navigator.mediaDevices.getUserMedia =
			navigator.mediaDevices.getUserMedia ||
			navigator.mediaDevices.webkitGetUserMedia ||
			navigator.mediaDevices.mozGetUserMedia;
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(stream => {
				document.querySelector('#myVideoTag').srcObject = stream;
				rtcPeerConn.addStream(stream);
				// window.rtcPeerConn.addStream(stream);
				document.querySelector('#myVideoTag').play();
			})
			.catch(onError);
	}

	function toggleAudio() {
		constraints.audio = !constraints.audio;
		document.querySelector('.interviewq-bottom-nav-button-mute').classList.toggle('interviewq-video-button-toggle-color');
		document.querySelector('.interviewq-bottom-nav-button-mute').textContent === "Mute" ? document.querySelector('.interviewq-bottom-nav-button-mute').textContent = "Muted" : document.querySelector('.interviewq-bottom-nav-button-mute').textContent = "Mute";
		
		restartStream();
	}

	function toggleVideo() {
		document.querySelector('.interviewq-bottom-nav-button-video').classList.toggle('interviewq-video-button-toggle-color')
		constraints.video === false
			? (constraints.video = videoProps)
			: (constraints.video = false);
		restartStream();
	}

	const sendMessageFunction = e => {
		e.preventDefault();
		//eslint-disable-next-line
		if (document.querySelector('#myMessage').value != '') {
			displayMessage(`${props.myName} : ${document.querySelector('#myMessage').value}`);
			io.emit('send', {
				author: props.myName,
				message: document.querySelector('#myMessage').value,
				room: SIGNALING_ROOM,
			});
			document.querySelector('#myMessage').value = '';
		}
	};

	io.emit('ready', {
		chat_room: ROOM,
		signaling_room: SIGNALING_ROOM,
		my_name: props.myName,
	});

	io.emit('signal', {
		type: 'user_here',
		message: 'Are you ready for a call?',
		room: SIGNALING_ROOM,
	});

	// io.on('signaling_message', data => {
	// 	if(theParty){

	// 		displaySignalingMessage('Signal received: ' + data.message);
	// 		if (!rtcPeerConn) {
	// 			startSignaling();
	// 		}
			
	// 		if (data.type !== 'user_here') {
	// 			var message = JSON.parse(data.message);
	// 			if (message.sdp) {
	// 				rtcPeerConn.setRemoteDescription(
	// 					new RTCSessionDescription(message.sdp),
	// 					function() {
	// 						if (rtcPeerConn.remoteDescription.type === 'offer') {
	// 							rtcPeerConn.createAnswer(sendLocalDesc, logError);
	// 						}
	// 					},
	// 					logError,
	// 					);
	// 				} else {
	// 					rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate));
	// 				}
	// 			}
	// 		}
	// });
		io.on('signaling_message', data => {
			displaySignalingMessage('Signal received: ' + data.message);
			if (!rtcPeerConn) {
				startSignaling();
			}

			if (data.type !== 'user_here') {
				var message = JSON.parse(data.message);
				if (message.sdp) {
					rtcPeerConn.setRemoteDescription(
						new RTCSessionDescription(message.sdp),
						function() {
							if (rtcPeerConn.remoteDescription.type === 'offer') {
								rtcPeerConn.createAnswer(sendLocalDesc, logError);
							}
						},
						logError,
					);
				} else {
					rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate));
				}
			}
		});

		io.on('announce', data => {
			displayMessage(data.message);
		});

		io.on('message', data => {
			displayMessage(data.author + ': ' + data.message);
		});
	// }

	const endConnection = () => {
		console.log('END CONNECTION');
		// io.disconnect();
		window.close();
	};

	// const style = {
	// 	display: "flex",
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	border: "solid 1px #ddd",
	// 	background: "#f0f0f0"
	//   };

	return (
		<>
			{/* <Resizable className="qwerty"
    style={style}
    defaultSize={{
      width: 200,
      height: 200
    }}
  >
    001
  </Resizable> */}
        <div className="video-container">
            <div className="interviewq-two-video-screens">
					<Draggable>
						<video id="myVideoTag" autoPlay="false" muted="muted"></video>
					</Draggable>
                <div className="theirVideoDiv">
					<video id="theirVideoTag" autoPlay="false"></video>
					<div className="interviewq-video-controls">
						<button className="interviewq-bottom-nav-button-video" onClick={toggleVideo}>Video off/on</button>
						<button className="interviewq-bottom-nav-button-mute" onClick={toggleAudio}>Mute</button>
						<button className="interviewq-bottom-nav-button" onClick={endConnection}>End</button>
					</div>
				</div>
			</div>
			<Draggable>

			<div className="the-secret-is-cumin">
				<div id="chatArea" className="interviewq-meeting-chatbox"></div>
				<div id="signalingArea"></div>
				<form>
					<input id="myMessage" 
						type='text'
					// onClick={e => {
					// 	// e.preventDefault()
					// 	e.stopPropagation()
					// }} 
					onMouseDown={e => {
						// e.preventDefault()
						e.stopPropagation()
					}} 
					// onMouseUp={e => {
					// 	// e.preventDefault()
					// 	e.stopPropagation()
					// }}
					/>
					<input
						id="sendMessage"
						type="submit"
						onClick={sendMessageFunction}
					/>
				</form>
			</div>
			</Draggable>

        </div>
		</>
	);
};

export default Room;
