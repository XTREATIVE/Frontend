import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function NewPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Create New Password</Text>

            <Text style={styles.label}>New Password</Text>
      <TextInput style={styles.input} placeholder="New Password" secureTextEntry />

            <Text style={styles.label}>Confirm Password</Text>
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('PasswordChanged')}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
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
    marginBottom: 0,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#280300',
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'semibold',
    marginBottom: 6,
    alignSelf: 'flex-start', // Ensures the label aligns to the left
  },
  input: {
    height: 50,
    borderColor: '#f9622c',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 17,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#f9622c',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
