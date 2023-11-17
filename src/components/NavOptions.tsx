import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

const imagePaths: any = {
  'get-ride': require('../assets/images/get-ride.png'),
  'post-ride': require('../assets/images/post-ride.png'),
  // Add more image paths as needed
};

const data = [
  {
    id: '1',
    title: 'Get a Ride',
    image: 'get-ride',
    screen: 'AvailableRides',
  },
  {
    id: '2',
    title: 'Post a Ride',
    image: 'post-ride',
    screen: 'PostRideScreen',
  },
];
const NavOptions = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{paddingBottom: 160, justifyContent: 'center'}}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              tw`p-2 pl-6 pb-8 `,
              styles.menuItem,
              {
                marginHorizontal: '6%',
                width: '88%',
                marginTop: item.title === 'Get a Ride' ? 0 : 17,
                marginBottom: item.title === 'Get a Ride' ? 0 : 20,
              },
            ]}
            onPress={() => navigateToScreen(item.screen)}>
            <View>
              <Image
                style={{
                  width: '100%',
                  height: 150,
                  resizeMode: 'contain',
                }}
                source={imagePaths[item.image]}
              />
            </View>
            <Text style={[tw`mt-3 font-bold text-lg `, {color: '#364F6B'}]}>
              {item.title}
            </Text>
            <Icon
              type="antdesign"
              name="arrowright"
              color="white"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  menuItem: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    elevation: 2,
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  iconStyle: {
    padding: 8,
    borderRadius: 50,
    width: 40,
    marginTop: 10,
    backgroundColor: '#364F6B',
  },
});
