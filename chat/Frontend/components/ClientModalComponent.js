import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, Modal, StyleSheet } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const ClientModalComponent = ({ isVisible, onClose }) => {
  const [wifiList, setWifiList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const scanWifi = async () => {
    try {
      const networks = await WifiManager.loadWifiList();
      setWifiList(networks);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Error scanning for Wi-Fi networks: ' + error.message);
      console.error('Error scanning for Wi-Fi networks:', error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      scanWifi();
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.container}>
        <Button title="Scan for Wi-Fi" onPress={scanWifi} />
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <FlatList
          data={wifiList}
          keyExtractor={(item) => item.SSID}
          renderItem={({ item }) => (
            <View style={styles.networkItem}>
              <Text>{item.SSID}</Text>
              <Text>Strength: {item.level}</Text>
            </View>
          )}
        />
        <Button
          title="Close"
          onPress={() => onClose()}
          color="#C147E9"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  networkItem: {
    marginVertical: 10,
  },
});

export default ClientModalComponent;
