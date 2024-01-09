import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RTCView, RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, mediaDevices } from 'react-native-webrtc';

class VideoChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localStream: null,
      remoteStream: null,
      peerConnection: null,
    };
  }

  componentDidMount() {
    this.setupLocalStream();
  }

  setupLocalStream = async () => {
    const isFront = true; // Set to true for the front camera
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find((device) => device.kind === 'videoinput' && device.facing === facing);

    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Adjust these values as needed
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode: facing,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };

    const localStream = await mediaDevices.getUserMedia(constraints);
    this.setState({ localStream });
  };

  createPeerConnection = () => {
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send ICE candidate to the remote peer via WebSocket for signaling
        // Example: socket.emit('ice-candidate', { candidate: event.candidate });
      }
    };

    peerConnection.onaddstream = (event) => {
      this.setState({ remoteStream: event.stream });
    };

    this.setState({ peerConnection });
  };

  startVideoCall = () => {
    this.createPeerConnection();

    // Add the local stream to the peer connection
    this.state.peerConnection.addStream(this.state.localStream);

    // Create an offer and set it as the local description
    this.state.peerConnection.createOffer().then((offer) => {
      return this.state.peerConnection.setLocalDescription(offer);
    }).then(() => {
      // Send the offer to the remote peer via WebSocket for signaling
      // Example: socket.emit('offer', { offer: this.state.peerConnection.localDescription });
    });
  };

  render() {
    const { localStream, remoteStream } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          {localStream && (
            <RTCView
              streamURL={localStream.toURL()}
              style={styles.localVideo}
            />
          )}
          {remoteStream && (
            <RTCView
              streamURL={remoteStream.toURL()}
              style={styles.remoteVideo}
            />
          )}
        </View>
        <TouchableOpacity onPress={this.startVideoCall} style={styles.callButton}>
          <Text style={styles.callButtonText}>Start Video Call</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideo: {
    width: 160,
    height: 120,
    margin: 5,
    backgroundColor: 'black',
  },
  remoteVideo: {
    width: 160,
    height: 120,
    margin: 5,
    backgroundColor: 'black',
  },
  callButton: {
    backgroundColor: '#703efe',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  callButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default VideoChat;
