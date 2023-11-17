import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import HomeScreen from './screens/HomeScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AvailableRides from './screens/AvailableRides';
import PostRideScreen from './screens/PostRideScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import {firebase} from './config';
import {NativeBaseProvider} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
export type RootStackParamList = {
  HomeScreen: undefined;
  AvailableRides: undefined;
  PostRideScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = ({navigation}: any) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [initiallzing, setIntializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user: any) => {
    if (user) {
      setUser(user);
      console.log('User : ', user.multiFactor.user.email);
      setIsSignedIn(true);
    }
    if (initiallzing) setIntializing(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    SplashScreen.hide();

    return subscriber;
  }, [user]);

  if (initiallzing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isSignedIn ? 'HomeScreen' : 'LoginScreen'}>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AvailableRides"
                component={AvailableRides}
                options={{
                  headerTitle: 'Available Rides',
                  headerTintColor: '#364F6B',
                  headerStyle: {
                    backgroundColor: '#f6f6f6',
                  },
                }}
              />
              <Stack.Screen
                name="PostRideScreen"
                component={PostRideScreen}
                options={{
                  headerTitle: 'Post Your Ride',
                  headerTintColor: '#364F6B',
                  headerStyle: {
                    backgroundColor: '#f6f6f6',
                  },
                }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
