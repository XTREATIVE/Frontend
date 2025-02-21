import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper'; // Importing a Checkbox component

export default function AgreeScreen({ navigation }) {
  const [agreed, setAgreed] = useState(false);

  const handleDecline = () => {
    Alert.alert(
      "Terms & Conditions",
      "You need to agree to the terms and conditions to use the app.",
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Terms and Conditions</Text>

      {/* Full Terms & Conditions */}
      <Text style={styles.termsText}>
        1. By using this app, you agree to abide by our terms of service and privacy policies.{'\n\n'}
        2. Your personal data will be securely stored and not shared with third parties without your consent.{'\n\n'}
        3. Misuse of the app, including fraudulent activities, will result in account suspension.{'\n\n'}
        4. The company reserves the right to update these terms at any time.{'\n\n'}
        5. For full terms, visit our website or contact support.{'\n\n'}
      </Text>

      {/* Checkbox for Agreement */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={agreed ? 'checked' : 'unchecked'}
          onPress={() => setAgreed(!agreed)}
          color="#280300"
        />
        <Text style={styles.checkboxText}>I agree to the Terms and Conditions</Text>
      </View>

      {/* Agree Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: agreed ? '#f9622c' : '#ccc' }]}
        onPress={() => agreed && navigation.replace('SignUp', { agreed: true })}
        disabled={!agreed}
      >
        <Text style={styles.buttonText}>I Agree</Text>
      </TouchableOpacity>

      {/* Decline Button */}
      <TouchableOpacity onPress={handleDecline} style={styles.declineButton}>
        <Text style={styles.declineText}>Decline</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  termsText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    color: '#280300',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    backgroundColor: '#f9622c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  declineButton: {
    marginTop: 15,
  },
  declineText: {
    fontSize: 16,
    color: '#B14228',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

