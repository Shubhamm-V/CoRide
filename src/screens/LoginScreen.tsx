import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

import {firebase} from '../config';

const LoginScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);

  const login = async () => {
    let formShouldSubmit = true;

    if (email.trim().length === 0) {
      formShouldSubmit = false;
      setEmailRequired(true);
    }
    if (password.trim().length === 0) {
      formShouldSubmit = false;
      setPasswordRequired(true);
    }

    if (!formShouldSubmit) {
      return;
    }

    setPasswordRequired(false);
    setEmailRequired(false);

    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('HomeScreen');
      setLoading(false);
    } catch (error) {
      Alert.alert('Please enter valid credentials');
      setLoading(false);
    }
  };

  return loading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Login with</Text>
          <Image
            style={{
              width: 120,
              height: 48,
              resizeMode: 'contain',
              marginLeft: 3,
            }}
            source={require('../assets/images/banner.png')}
          />
        </View>

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          setText={setEmail}
          value={email}
          required={emailRequired}
          setRequired={setEmailRequired}
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {}}
          setText={setPassword}
          value={password}
          required={passwordRequired}
          setRequired={setPasswordRequired}
        />

        <CustomButton label={'Login'} onPress={login} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color: '#666'}}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={{color: '#364F6B', fontWeight: '700'}}> SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  loginText: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 27,
    marginTop: 2,
    fontWeight: 'bold',
    color: '#364F6B',
  },
  loginHeader: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
    gap: 5,
  },
});
