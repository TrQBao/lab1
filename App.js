import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';

const units = ['Metre', 'Millimetre', 'Mile', 'Foot'];

const conversionFactors = {
  Metre: 1,
  Millimetre: 0.001,
  Mile: 1609.34,
  Foot: 0.3048,
};

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Metre');
  const [toUnit, setToUnit] = useState('Metre');
  const [result, setResult] = useState(null);

  const validateInput = (value) => {
    return !isNaN(value) && value.trim() !== '';
  };

  const convertUnits = () => {
    if (!validateInput(inputValue)) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    const value = parseFloat(inputValue);
    const baseValue = value * conversionFactors[fromUnit];
    const convertedValue = baseValue / conversionFactors[toUnit];
    setResult(convertedValue.toFixed(4));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Length Unit Converter</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>From:</Text>
        <Picker
          selectedValue={fromUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setFromUnit(itemValue)}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>To:</Text>
        <Picker
          selectedValue={toUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setToUnit(itemValue)}
        >
          {units.map((unit) => (
            <Picker.Item key={unit} label={unit} value={unit} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={convertUnits}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>

      {result !== null && (
        <Text style={styles.result}>
          {inputValue} {fromUnit} = {result} {toUnit}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  label: {
    width: 50,
    marginRight: 10,
    color: '#333',
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
