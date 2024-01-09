import React, { useState } from 'react';
import { View, Button, Modal, Text, Alert, StyleSheet } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const ServerModalComponent = ({ isVisible, onClose }) => {
  const [wifiStatusMessage, setWifiStatusMessage] = useState('Turn on your Wi-Fi hotspot');
  const [errorMessage, setErrorMessage] = useState(null);

  const startServer = async () => {
    try {
      await WifiManager.setEnabled(true);
      setWifiStatusMessage('Wi-Fi is now active');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Error starting server: ' + error.message);
      console.error('Error starting server:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeading}>Server Settings</Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <Text>{wifiStatusMessage}</Text>
        <Button title="Start Server" onPress={startServer} />
        <View style={styles.buttonWrapper}>
          <Button
            title="Cancel"
            onPress={() => onClose()}
            color="#C147E9"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ServerModalComponent;
