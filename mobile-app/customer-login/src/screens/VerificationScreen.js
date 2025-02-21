import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function VerificationScreen({ navigation }) {
  const [otp, setOtp] = useState('');

  // Function to verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the verification code.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'OTP Verified Successfully!');
        navigation.navigate('Congratulations'); // Navigate after success
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP. Try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Verification Code"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />
        <TouchableOpacity style={styles.button} onPress={verifyOtp}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingLeft: 15,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#f9622c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
