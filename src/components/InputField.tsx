import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  required,
  setText,
  setRequired,
  value,
  customStyle,
}: any) => {
  const setInputValue = (input: string) => {
    setText(input);
    setRequired(false);
  };
  return (
    <View style={customStyle ? customStyle : styles.input}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          onChangeText={setInputValue}
          placeholderTextColor="#ccc"
          style={{flex: 1, paddingVertical: 0, color: '#364F6B'}}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          onChangeText={setInputValue}
          placeholderTextColor="#ccc"
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: '#364F6B'}}
        />
      )}
      {required && value.length == 0 && (
        <Text style={{color: 'red'}}> Required*</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    color: 'red',
  },
});

export default InputField;
