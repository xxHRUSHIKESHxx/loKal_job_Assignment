import React from 'react';
import { Modal, View, Text, Button, StyleSheet , Image } from 'react-native';

const ErrorPopup = ({ visible, onClose, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
        <Image 
             source={require('../images/error-icon.png')} 
            style={styles.image} 
          />
          <Text style={styles.message}>something went wrong</Text>
          <Button title="Go to Bookmarks" onPress={onClose}  color='#00A35A' />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: '#2B1D51',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color:'white',
    fontWeight: 'bold',
  },
});

export default ErrorPopup;
