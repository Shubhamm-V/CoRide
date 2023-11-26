import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {firebase} from '../config';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import CustomSwitch from '../components/CustomSwitch';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import RideCard from '../components/RideCard';

const CAMPUSES = [
  'MIT Engineering Campus',
  'MIT Polytechnic Campus',
  'MIT Cidco Campus',
  'MIT Rotegoan Campus',
  'Other Address',
];

const RegisterScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dorLabel, setdorLabel] = useState('Date for Ride');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [vehicle, setVehicle] = useState('Bike');
  const [category, setCategory] = useState('Paid');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [userRideData, setUserRideData] = useState<any>();
  const [editingRide, setEditingRide] = useState(false);
  const [timeLabel, setTimeLabel] = useState('Time for Ride');
  const [timeOpen, setTimeOpen] = useState(false);

  const [fromSelected, setFromSelected] = useState('Other Address');
  const [toSelected, setToSelected] = useState('Other Address');

  const [fromRequired, setFromRequired] = useState(false);
  const [toRequired, setToRequired] = useState(false);
  const [phoneRequired, setPhoneRequired] = useState(false);
  const [amountRequired, setAmountRequired] = useState(false);
  const [selectionVehicleMode, setSelectionVehicleMode] = useState(1);
  const [selectionCategoryMode, setSelectionCategoryMode] = useState(1);

  const userData = useSelector((state: RootState) => state.user);
  const {name, email, gender} = userData;

  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection('rides')
      .where('email', '==', email)
      .get()
      .then((querySnapshot: any) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            setUserRideData(data);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const onSelectVehicle = (value: number) => {
    if (value == 1) setVehicle('Bike');
    else setVehicle('Scooty');
  };
  const onSelectCategory = (value: number) => {
    if (value == 1) setCategory('Paid');
    else setCategory('Free');
  };

  const deleteRide = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection('rides')
      .where('email', '==', userData?.email)
      .get()
      .then((querySnapshot: any) => {
        if (!querySnapshot.empty) {
          // Delete the document for each document found
          querySnapshot.forEach((doc: any) => {
            doc.ref
              .delete()
              .then(() => {
                console.log('Document successfully deleted!');
                setLoading(false);
                setUserRideData(null);
              })
              .catch((error: Error) => {
                console.error('Error deleting document: ', error);
                setLoading(false);
              });
          });
        } else {
          // No document found for the specified email
          console.log('No document found for the specified email');
          setLoading(false);
          // Add your logic or feedback for no document found here
        }
      })
      .catch((error: Error) => {
        console.error('Error fetching document: ', error);
        setLoading(false);
      });
  };

  const postRide = () => {
    let formShouldSubmit = true;

    if (from.trim().length === 0 && fromSelected === 'Other Address') {
      formShouldSubmit = false;
      setFromRequired(true);
    }
    if (to.trim().length === 0 && toSelected === 'Other Address') {
      formShouldSubmit = false;
      setToRequired(true);
    }

    if (phone.trim().length === 0) {
      formShouldSubmit = false;
      setPhoneRequired(true);
    }

    if (category === 'Paid' && amount.trim().length === 0) {
      setAmountRequired(true);
      formShouldSubmit = false;
    }

    if (!formShouldSubmit) {
      return;
    }
    if (dorLabel === 'Date for Ride') {
      Alert.alert('Date is Required');
      return;
    }
    if (timeLabel === 'Time for Ride') {
      Alert.alert('Time is Required');
      return;
    }
    const data = {
      name,
      email,
      gender,
      from: fromSelected === 'Other Address' ? from : fromSelected,
      to: toSelected === 'Other Address' ? to : toSelected,
      dorLabel,
      timeLabel,
      vehicle,
      category,
      amount,
      phone,
    };

    setLoading(true);
    if (editingRide) {
      firebase
        .firestore()
        .collection('rides')
        .where('email', '==', userData.email)
        .get()
        .then((querySnapshot: any) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc: any) => {
              doc.ref
                .update(data)
                .then(() => {
                  console.log('Document successfully updated!', data);
                  setLoading(false);
                  setUserRideData(data);
                })
                .catch((error: any) => {
                  console.error('Error updating document: ', error);
                  setLoading(false);
                });
            });
          } else {
            console.log('No document found for the specified email');
            setLoading(false);
          }
        })
        .catch((error: any) => {
          console.error('Error fetching document: ', error);
          setLoading(false);
        });
    } else {
      firebase
        .firestore()
        .collection('rides')
        .add(data)
        .then(docRef => {
          setLoading(false);
          setUserRideData(data);
        })
        .catch(error => {
          setLoading(false);
        });
    }
  };

  if (userRideData) {
    return loading ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <TouchableOpacity
          style={{position: 'absolute', top: 15, left: 10}}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Ionicons name="arrow-back" size={35} color="#666" />
        </TouchableOpacity> */}
        <Text style={styles.rideHeader}>You've already posted Ride</Text>

        <RideCard rideData={userRideData} />
        <View style={styles.buttonContainer}>
          <CustomButton
            label={'Edit'}
            customStyle={styles.editButton}
            customTextStyle={styles.editText}
            onPress={() => {
              setUserRideData(undefined);
              setEditingRide(true);
            }}
          />
          <CustomButton
            label={'Delete'}
            customStyle={styles.deleteButton}
            customTextStyle={styles.deleteText}
            onPress={deleteRide}
          />
        </View>
      </View>
    );
  }

  return loading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25, paddingTop: '5%'}}>
        <View>
          <Text style={{paddingBottom: 2}}>From</Text>

          <SelectDropdown
            data={CAMPUSES}
            onSelect={(selectedItem, index) => {
              setFromSelected(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <Ionicons
                  name={
                    isOpened ? 'chevron-up-outline' : 'chevron-down-outline'
                  }
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
        {fromSelected == 'Other Address' && (
          <View style={{marginTop: 20}}>
            <InputField
              setText={setFrom}
              value={from}
              required={fromRequired}
              setRequired={setFromRequired}
              label={'Enter location for your ride'}
              icon={
                <Ionicons
                  name="location"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
            />
          </View>
        )}
        <View>
          <Text
            style={{
              paddingBottom: 2,
              marginTop: fromSelected === 'Other Address' ? 0 : 20,
            }}>
            To
          </Text>
          <SelectDropdown
            data={CAMPUSES}
            onSelect={(selectedItem, index) => {
              setToSelected(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <Ionicons
                  name={
                    isOpened ? 'chevron-up-outline' : 'chevron-down-outline'
                  }
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
        </View>
        {toSelected === 'Other Address' && (
          <View style={{marginTop: 20}}>
            <InputField
              label={'Enter destination address'}
              setText={setTo}
              value={to}
              required={toRequired}
              setRequired={setToRequired}
              icon={
                <Ionicons
                  name="location"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
            />
          </View>
        )}
        <View style={{marginTop: toSelected === 'Other Address' ? 0 : 20}}>
          <Text style={{paddingLeft: 2}}>Date</Text>
          <View style={styles.dateStyle}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
                {dorLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={{paddingLeft: 2}}>Date</Text>
          <View style={styles.dateStyle}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TouchableOpacity onPress={() => setTimeOpen(true)}>
              <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
                {timeLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2024-01-01')}
          minimumDate={new Date('2023-10-08')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setdorLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DatePicker
          modal
          open={timeOpen}
          date={date}
          mode={'time'}
          onConfirm={selectedTime => {
            setTimeOpen(false);
            setTimeLabel(selectedTime.toLocaleTimeString());
          }}
          onCancel={() => {
            setTimeOpen(false);
          }}
        />
        <View
          style={{
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Text style={{color: '#666', margin: 5}}>Vehicle</Text>
          <CustomSwitch
            option1="Bike"
            option2="Scooty"
            selectionMode={selectionVehicleMode}
            setSelectionMode={setSelectionVehicleMode}
            onSelectSwitch={onSelectVehicle}
          />
        </View>
        <View
          style={{
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Text style={{color: '#666', margin: 5}}>Category</Text>
          <CustomSwitch
            option1="Paid"
            option2="Free"
            selectionMode={selectionCategoryMode}
            setSelectionMode={setSelectionCategoryMode}
            onSelectSwitch={onSelectCategory}
          />
        </View>

        {category === 'Paid' && (
          <View>
            <Text style={{paddingLeft: 2, marginBottom: 7}}>Price</Text>
            <InputField
              label={'10'}
              setText={setAmount}
              value={amount}
              required={amountRequired}
              setRequired={setAmountRequired}
              keyboardType="numeric"
              icon={
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
            />
          </View>
        )}

        <View>
          <Text style={{paddingLeft: 2, marginBottom: 7}}>Phone</Text>
          <InputField
            label={'+91 9999999999'}
            setText={setPhone}
            value={phone}
            required={phoneRequired}
            setRequired={setPhoneRequired}
            keyboardType="numeric"
            icon={
              <Ionicons
                name="call"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
            }
          />
        </View>
        <CustomButton label={'Post Your Ride'} onPress={postRide} />
        <View style={{marginBottom: 25}}></View>
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
  dateStyle: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    marginTop: 5,
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  },
  headerStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  rideHeader: {
    fontSize: 22,
    color: '#364F6B',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: 7,
    width: '94%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    elevation: 2,
  },
  editButton: {
    width: '49%',
    borderColor: '#364F6B',
    borderWidth: 1,
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
  },
  editText: {
    color: '#364F6B',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  deleteButton: {
    width: '49%',
    borderWidth: 1,
    backgroundColor: '#364F6B',
    padding: 20,
    borderRadius: 10,
  },
  deleteText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },

  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#f5f5f5'},
  dropdown1RowStyle: {
    backgroundColor: '#f5f5f5',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {color: '#364F6B', textAlign: 'left'},
});

{
  /* <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {dorLabel}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setdorLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */
}
