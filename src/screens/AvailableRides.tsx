import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import RideCard from '../components/RideCard';
import {ActivityIndicator} from 'react-native';
import {FlatList} from 'native-base';
import {firebase} from '../config';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RideInfo = {
  name: string;
  from: string;
  amount: string;
  category: string;
  dorLabel: string;
  timeLabel: string;
  email: string;
  to: string;
  vehicle: string;
  gender: string;
  phone: string;
};
const AvailableRides = () => {
  const [ridesData, setRidesData] = useState<RideInfo[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tempRideData, setTempRideData] = useState<RideInfo[]>([]);
  const [searchRequired, setSearchRequired] = useState(false);
  const getRidesData = async () => {
    setLoading(true);
    try {
      const ridesCollection = firebase.firestore().collection('rides');
      const querySnapshot = await ridesCollection.get();

      const ridesData: any = [];
      querySnapshot.forEach(doc => {
        ridesData.push({
          id: doc.id, // Document ID
          ...doc.data(), // Data fields from the document
        });
      });
      setLoading(false);
      return ridesData;
    } catch (error) {
      console.error('Error getting rides data:', error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    getRidesData().then(data => {
      setRidesData(data);
      setTempRideData(data);
    });
  }, []);

  const filterResults = (value: string) => {
    value = value.toLowerCase();
    const data = tempRideData.filter(item => {
      item.from = item.from.toLowerCase();
      return item.from.includes(value);
    });
    setRidesData(data);
  };

  if (loading) {
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
    <View style={{flex: 1}}>
      {tempRideData.length > 0 && (
        <InputField
          label={'Search by Location'}
          setText={filterResults}
          value={searchInput}
          required={searchRequired}
          setRequired={setSearchRequired}
          customStyle={styles.searchInput}
          icon={
            <Ionicons
              name="search"
              size={20}
              color="#364F6B"
              style={{paddingVertical: 5, paddingHorizontal: 10}}
            />
          }
          keyboardType="web-search"
        />
      )}
      {ridesData.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/images/empty.png')}
            style={{height: 250, width: 250, resizeMode: 'contain'}}
          />
          <Text style={{color: '#364F6B', fontWeight: 'bold'}}>
            {' '}
            Oops... No Rides Available
          </Text>
        </View>
      ) : (
        <View style={{paddingBottom: 80}}>
          {ridesData.length > 0 && (
            <FlatList
              data={ridesData}
              keyExtractor={item => item?.email} // You can use a unique key here
              renderItem={({item}) => {
                return <RideCard rideData={item} />;
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginHorizontal: '3%',
    borderBottomColor: '#ccc',
    backgroundColor: '#fbfbfb',
  },
});

export default AvailableRides;
