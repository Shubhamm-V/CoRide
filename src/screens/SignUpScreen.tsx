import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {firebase} from '../config';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import CustomSwitch from '../components/CustomSwitch';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';

const RegisterScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPasword] = useState('');
  const [gender, setGender] = useState('male');

  const [nameRequired, setNameRequired] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(false);

  const [selectionMode, setSelectionMode] = useState(1);

  const onSelectSwitch = (value: number) => {
    if (value == 1) setGender('male');
    else setGender('female');
  };

  const signup = async () => {
    let formShouldSubmit = true;

    if (name.trim().length === 0) {
      formShouldSubmit = false;
      setNameRequired(true);
    }
    if (email.trim().length === 0) {
      formShouldSubmit = false;
      setEmailRequired(true);
    }
    if (password.trim().length === 0) {
      formShouldSubmit = false;
      setPasswordRequired(true);
    }
    if (confirmPassword.trim().length === 0) {
      formShouldSubmit = false;
      setConfirmPasswordRequired(true);
    }

    if (!formShouldSubmit) {
      return;
    }

    if (password.length < 6) {
      formShouldSubmit = false;
      Alert.alert('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password and Confirm Password should be same');
      return;
    }

    setNameRequired(false);
    setEmailRequired(false);
    setPasswordRequired(false);
    setConfirmPasswordRequired(false);
    setLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser?.uid)
          .set({
            name,
            email,
            password,
            gender,
          });
        setLoading(false);
        navigation.navigate('HomeScreen');
      })
      .catch(err => {
        Alert.alert('Something Went Wrong');
        setLoading(false);
      });
  };

  return loading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25, paddingTop: '20%'}}>
        <View style={styles.signupHeader}>
          <Text style={styles.signupText}>Sign up with</Text>
          <Image
            style={{
              width: 120,
              height: 48,
              marginLeft: 3,
              resizeMode: 'contain',
            }}
            source={require('../assets/images/banner.png')}
          />
        </View>

        <InputField
          label={'Full Name'}
          required={nameRequired}
          value={name}
          setRequired={setNameRequired}
          setText={setName}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />

        <InputField
          label={'Email ID'}
          setText={setEmail}
          value={email}
          required={emailRequired}
          setRequired={setEmailRequired}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          setText={setPassword}
          value={password}
          required={passwordRequired}
          setRequired={setPasswordRequired}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />

        <InputField
          label={'Confirm Password'}
          setText={setConfirmPasword}
          value={confirmPassword}
          required={confirmPasswordRequired}
          setRequired={setConfirmPasswordRequired}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />
        <View
          style={{
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Text style={{color: '#666', margin: 5}}>Gender</Text>
          <CustomSwitch
            option1="Male"
            option2="Female"
            selectionMode={selectionMode}
            setSelectionMode={setSelectionMode}
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        <CustomButton label={'Register'} onPress={signup} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color: '#666'}}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{color: '#364F6B', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
  signupText: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 27,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#364F6B',
  },
  signupHeader: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
    gap: 5,
  },
});
