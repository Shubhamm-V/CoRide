import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import {firebase} from '../config';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setUser} from '../slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {Icon} from 'react-native-elements';

import {Box, Button, Popover, ScrollView} from 'native-base';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen = ({route, navigation}: HomeProps) => {
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          dispatch(setUser(snapshot.data()));
        } else {
          console.log('User does not exist');
        }
      });
  }, []);
  return (
    <SafeAreaView style={[tw`h-full`, {backgroundColor: '#f6f6f6'}]}>
      <View style={tw`p-4`}>
        <View style={styles.header}>
          <Image
            style={{
              width: 150,
              height: 160,
              resizeMode: 'contain',
            }}
            source={require('../assets/images/banner.png')}
          />
          <View style={{width: 80, marginTop: -2}}>
            <Popover
              trigger={triggerProps => {
                return (
                  <Button
                    {...triggerProps}
                    style={{backgroundColor: 'transparent'}}>
                    <Image
                      style={{
                        width: userData?.gender === 'male' ? 55 : 47,
                        height: userData?.gender === 'male' ? 55 : 47,
                        resizeMode: 'contain',
                      }}
                      source={
                        userData?.gender === 'male'
                          ? require('../assets/images/male.png')
                          : require('../assets/images/female.png')
                      }
                    />
                  </Button>
                );
              }}>
              <Popover.Content style={{width: 190, marginRight: 8}}>
                <Popover.Arrow />
                <Popover.Header style={{marginTop: -14}}>
                  {' '}
                  <View>
                    <View style={styles.userInfo}>
                      <Ionicons
                        name="person"
                        size={20}
                        color="#364F6B"
                        style={{marginRight: 5, fontSize: 16}}
                      />
                      <Text style={{color: '#364F6B'}}> Name</Text>
                    </View>
                    <Text style={{color: '#364F6B', fontWeight: 'bold'}}>
                      {userData?.name}
                    </Text>
                  </View>
                </Popover.Header>
                <Popover.Header>
                  <View>
                    <View style={styles.userInfo}>
                      <Ionicons
                        name="mail"
                        size={20}
                        color="#364F6B"
                        style={{marginRight: 5, fontSize: 16}}
                      />
                      <Text style={{color: '#364F6B'}}> Email</Text>
                    </View>
                    <Text style={{color: '#364F6B', fontWeight: 'bold'}}>
                      {userData?.email}
                    </Text>
                  </View>
                </Popover.Header>
                <Popover.Header>
                  <TouchableOpacity
                    onPress={() => {
                      firebase.auth().signOut();
                      navigation.navigate('LoginScreen');
                    }}>
                    <View style={styles.logoutContainer}>
                      <Text
                        style={{
                          color: '#364F6B',
                          fontWeight: 'bold',
                          marginBottom: 5,
                          fontSize: 20,
                        }}>
                        Logout
                      </Text>
                      <Icon
                        type="antdesign"
                        name="logout"
                        color="#364F6B"
                        style={{height: 25, width: 25, fontWeight: 'bold'}}
                      />
                    </View>
                  </TouchableOpacity>
                </Popover.Header>
              </Popover.Content>
            </Popover>
          </View>
        </View>
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  logoutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
  },
});

// <TouchableOpacity
// onPress={() => {
//   route.params.setIsSignedIn(false);
//   firebase.auth().signOut();
// }}>
// <Text
//   style={{
//     fontSize: 22,
//     fontWeight: 'bold',
//     backgroundColor: 'blue',
//     color: 'white',
//     padding: 5,
//   }}>
//   Sign Out
// </Text>
// </TouchableOpacity>
