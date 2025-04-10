// App.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Platform, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment-timezone';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const timeZones = moment.tz.names().map(tz => ({
  label: tz,
  value: tz,
}));

export default function App() {
  const [fromTZ, setFromTZ] = useState('UTC');
  const [toTZ, setToTZ] = useState('Asia/Kolkata');
  const [date, setDate] = useState(new Date());
  const [convertedTime, setConvertedTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    convertTime();
  }, [fromTZ, toTZ, date]);

  const convertTime = () => {
    const formatted = moment.tz(date, fromTZ).tz(toTZ).format('YYYY-MM-DD HH:mm:ss z');
    setConvertedTime(formatted);
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>🕒 Time Zone Converter</Text>

        <View style={styles.section}>
          <Text style={styles.label}>From Time Zone</Text>
          <RNPickerSelect
            onValueChange={value => setFromTZ(value)}
            items={timeZones}
            value={fromTZ}
            style={pickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>To Time Zone</Text>
          <RNPickerSelect
            onValueChange={value => setToTZ(value)}
            items={timeZones}
            value={toTZ}
            style={pickerStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Select Date & Time</Text>
          <Button title={moment(date).format('YYYY-MM-DD HH:mm')} onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.result}>
          <Text style={styles.resultText}>Converted Time:</Text>
          <Text style={styles.converted}>{convertedTime}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8ff',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: '#444',
  },
  result: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  resultText: {
    fontSize: 18,
    color: '#666',
  },
  converted: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#222',
  },
});

const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
    paddingRight: 30,
  },
};
