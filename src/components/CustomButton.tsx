import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = ({label, onPress, customStyle, customTextStyle}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={customStyle ? customStyle : styles.button}>
      <Text style={customTextStyle ? customTextStyle : styles.buttonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#364F6B',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
});
