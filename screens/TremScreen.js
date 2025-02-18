import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function TremScreen({ navigation }) {
  const [readFullTerms, setReadFullTerms] = useState(false);

  const handleReadFullTerms = () => {
    setReadFullTerms(true); // Mark as read once the button is clicked
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>

      <ScrollView style={styles.termsContainer}>
        <Text style={styles.termsText}>
          1. By using this app, you agree to abide by our terms of service and privacy policies.{'\n\n'}
          2. Your personal data will be securely stored and not shared with third parties without your consent.{'\n\n'}
          3. Misuse of the app, including fraudulent activities, will result in account suspension.{'\n\n'}
          4. The company reserves the right to update these terms at any time.{'\n\n'}
          5. For full terms, visit our website or contact support.{'\n\n'}
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.readMoreButton} onPress={handleReadFullTerms}>
        <Text style={styles.readMoreText}>Read Full Terms</Text>
      </TouchableOpacity>
      <TouchableOpacity
            style={[styles.button, { backgroundColor: readFullTerms ? '#4D72C9' : '#ccc' }]}
            onPress={() => {
                if (readFullTerms) {
                navigation.navigate('VendorSignup'); // Navigate directly to VendorRegistration
                }
            }}
            disabled={!readFullTerms} // Disables the button until terms are agreed
            >
            <Text style={styles.buttonText}>I Agree</Text>
</TouchableOpacity>




      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.declineButton}>
        <Text style={styles.declineText}>Decline</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  termsContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#555',
  },
  readMoreButton: {
    marginBottom: 10,
  },
  readMoreText: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  declineButton: {
    marginTop: 10,
  },
  declineText: {
    fontSize: 16,
    color: '#B14228',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
