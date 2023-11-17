import {Divider} from 'native-base';
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RideCard = (props: any) => {
  const {
    name,
    email,
    from,
    to,
    gender,
    vehicle,
    phone,
    dorLabel,
    category,
    amount,
  } = props.rideData;
  return (
    <View style={styles.cardContainer}>
      <View style={{flexDirection: 'row', gap: 5}}>
        <Image
          source={
            gender === 'male'
              ? require('../assets/images/male.png')
              : require('../assets/images/female.png')
          }
          style={
            gender == 'male'
              ? styles.profileMaleImages
              : styles.profileFemaleImage
          }
        />
        <View style={styles.cardContent}>
          <View style={styles.profileHeader}>
            <Text style={styles.nameText}>{name}</Text>
            <View>
              {category == 'Paid' ? (
                <Text style={styles.badge}> ₹ {amount}</Text>
              ) : (
                <Text style={styles.badge}> Free</Text>
              )}
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text style={{fontWeight: 'bold', color: '#364F6B'}}>
                {' '}
                <Ionicons name="location" size={15} color="#364F6B" /> From
              </Text>
              <View>
                <Text style={{color: '#364F6B'}}>{from}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 15, paddingBottom: 15}}>
              <Text style={{fontWeight: 'bold', color: '#364F6B'}}>
                {' '}
                <Ionicons name="location" size={15} color="#364F6B" /> To
              </Text>
              <Text style={{maxWidth: '66%', color: '#364F6B'}}>{to}</Text>
            </View>
          </View>
        </View>
      </View>
      <Divider />
      <View style={styles.contactHeader}>
        <Text style={{fontSize: 15, color: '#364F6B'}}>Date for Ride</Text>
        <Text style={{fontSize: 15, color: '#364F6B', fontWeight: 'bold'}}>
          {dorLabel}
        </Text>
      </View>
      <Divider />
      <View style={styles.contactHeader}>
        <Text style={{fontSize: 15, color: '#364F6B'}}>Vehicle</Text>
        <Text style={{fontSize: 15, color: '#364F6B', fontWeight: 'bold'}}>
          {vehicle}
        </Text>
      </View>
      <Divider />
      <View style={styles.contactHeader}>
        <Text style={{fontSize: 15, color: '#364F6B'}}>Contact</Text>
        <Text style={{fontSize: 15, color: '#364F6B', fontWeight: 'bold'}}>
          +91 {phone}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f6f6f6',
    width: '94%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 6,
    marginVertical: 8,
    marginLeft: '3%',
    marginRight: '3%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    elevation: 2,
  },
  badge: {
    color: '#fff',
    backgroundColor: '#364F6B',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  profileMaleImages: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  profileFemaleImage: {
    height: 52,
    width: 52,
    borderRadius: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  cardContent: {
    marginLeft: 7,
    width: '78%',
  },
  nameText: {
    fontSize: 18,
    color: '#364F6B',
    fontWeight: 'bold',
  },
  contactHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RideCard;
