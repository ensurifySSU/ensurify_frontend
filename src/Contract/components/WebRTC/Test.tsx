// import { useEffect, useRef, useState } from 'react';

// const Test = ({ signaling, sessionId }: { signaling: WebSocket; sessionId: String }) => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const localStreamRef = useRef<MediaStream>();
//   // const peerConnection = useRef<RTCPeerConnection | null>(null);
//   const currentSessionId = useRef<string | null>(null);
//   const [pc, setPc] = useState(null);
//   const [dataChannel, setDataChannel] = useState(null);
//   const [isLocalStreamReady, setIsLocalStreamReady] = useState(false); // 로컬 스트림 상태

//   const startLocalStream = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localStreamRef.current = stream;
//       console.log('localStreamRef inside startLocalStream:', localStreamRef.current);
//       setIsLocalStreamReady(true);
//       if (localVideoRef.current && remoteVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error('접근 권한을 허용해주세요', error);
//     }
//   };

//   const createPeerConnection = async (sender, receiver) => {
//     console.log('craetePeer');
//     peerConnection.current = new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: 'stun:stun.l.google.com:19302',
//         },
//       ],
//     });

//     const offer = await peerConnection.current.createOffer();
//     await peerConnection.current.setLocalDescription(offer);

//     signaling.send(
//       JSON.stringify({
//         type: 'offer',
//         roomId: 1,
//         sender: sender, // sessionId
//         receiver: receiver, // sessionId
//         offer: offer,
//         sdp: offer.sdp,
//       }),
//     );
//   };

//   useEffect(() => {
//     console.log(signaling, sessionId);
//     const localVideo = localVideoRef.current;
//     const remoteVideo = remoteVideoRef.current;

//     //STUN 서버 설정
//     const configuration = {
//       iceServers: [
//         {
//           urls: 'stun:stun.l.google.com:19302',
//         },
//         {
//           urls: 'stun:stun.services.mozilla.com',
//         },
//       ],
//     };

//     //RTCPeerConnection 생성
//     const peerConnection = new RTCPeerConnection(configuration);

//     const offerConnection = async () => {
//       //offer 정보 교환
//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);
//       console.log(offer);

//       signaling.send(
//         JSON.stringify({
//           type: 'offer',
//           roomId: 1,
//           sender: '', // sessionId
//           receiver: '', // sessionId
//           offer: offer,
//           sdp: offer.sdp,
//         }),
//       );
//     };

//     offerConnection();

//     //ICE 후보가 발견되었을 때
//     peerConnection.onicecandidate = (e) => {
//       console.log(e.candidate);
//       if (e.candidate && signaling) {
//         console.log('후보 발견!');
//         signaling.send(
//           JSON.stringify({
//             type: 'candidate',
//             roomId: 1,
//             sender: '',
//             receiver: '',
//             candidate: e.candidate,
//           }),
//         );
//       } else {
//         console.log('ICE Candidate gathering complete.');
//       }
//     };
//     peerConnection.ontrack = (event) => {
//       const [stream] = event.streams;
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = stream;
//       }
//     };

//     //데이터 채널 설정
//     const channel = peerConnection.createDataChannel('chat');
//     channel.onopen = () => console.log('데이터 채널 오픈');
//     setDataChannel(channel);

//     //데이터 채널 수신 설정
//     peerConnection.ondatachannel = (e) => {
//       const receiveChannel = e.channel;
//       receiveChannel.onmessage = (e) => {
//         console.log(`저쪽에서 ${e.data}랍니다`);
//       };
//     };
//     setPc(peerConnection);

//     const getUserMedia = async () => {
//       if (!localVideo) return;
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         localVideo.srcObject = stream;
//         stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
//       } catch (error) {
//         console.error('Error accessing media devices.', error);
//       }
//     };

//     getUserMedia();

//     signaling.onmessage = async (event) => {
//       console.log(event.data);
//       console.log(localStreamRef.current);
//       const { type, allUsers, sender } = JSON.parse(event.data);

//       if (sessionId) {
//         console.log(sessionId);

//         signaling?.send(
//           JSON.stringify({
//             type: 'join_room',
//             roomId: '1',
//             sender: sessionId,
//           }),
//         );
//       }

//       // 로컬 스트림이 시작된 후에만 실행
//       // if (localStreamRef.current && type === 'all_users' && allUsers.length > 0) {
//       //   console.log(allUsers);

//       //   await createPeerConnection(sender, allUsers[0]);
//       // }
//     };
//   }, [signaling]);

//   return (
//     <div>
//       <video
//         ref={localVideoRef}
//         autoPlay
//         playsInline
//         muted
//         style={{ width: '250px', height: '200px' }}
//       />
//       <video
//         ref={remoteVideoRef}
//         autoPlay
//         playsInline
//         style={{ width: '250px', height: '200px', backgroundColor: '#ccc' }}
//       />
//     </div>
//   );
// };

// export default Test;
