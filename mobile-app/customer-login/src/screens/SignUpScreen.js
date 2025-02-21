import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, 
  Image, Alert 
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

export default function SignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    region: '',
    address: '',
    countryCode: 'UG',
    callingCode: '+256',
    flag: { uri: 'https://flagcdn.com/w320/ug.png' }
  });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateFields = () => {
    const { firstName, lastName, email, phoneNumber, address } = formData;
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Valid email is required';
    if (!phoneNumber.trim() || !/^[0-9]+$/.test(phoneNumber)) return 'Valid phone number is required';
    if (!address.trim()) return 'Address is required';
    return null;
  };

  const handleRegister = async () => {
    const errorMessage = validateFields();
    if (errorMessage) {
      Alert.alert('Validation Error', errorMessage);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://<your_ip>:8000/register/customer/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      response.ok ? navigation.navigate('Verification') : Alert.alert('Registration Failed', result.message || 'Unknown error');
    } catch (error) {
      Alert.alert('Error', error.message || 'Network issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>BECOME A CUSTOMER</Text>
        <Text style={styles.subtitle}>Create your account</Text>
        
        {['firstName', 'lastName', 'email', 'address'].map((field) => (
          <View key={field}>
            <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}</Text>
            <TextInput 
              style={styles.input} 
              placeholder={field.replace(/([A-Z])/g, ' $1')} 
              value={formData[field]} 
              onChangeText={(value) => handleChange(field, value)}
              keyboardType={field === 'email' ? 'email-address' : 'default'}
            />
          </View>
        ))}
        
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneContainer}>
          <TouchableOpacity onPress={() => setVisible(true)} style={styles.countryPickerContainer}>
            <CountryPicker
              withFilter withFlag withCallingCode withModal
              onSelect={(country) => setFormData({
                ...formData,
                countryCode: country.cca2,
                callingCode: `+${country.callingCode[0]}`,
                flag: { uri: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png` }
              })}
              visible={visible} onClose={() => setVisible(false)}
            />
            <Image source={formData.flag} style={styles.flag} />
          </TouchableOpacity>
          <Text style={styles.callingCode}>{formData.callingCode}</Text>
          <TextInput 
            style={styles.phoneInput} 
            placeholder="Your phone number" 
            value={formData.phoneNumber} 
            onChangeText={(value) => handleChange('phoneNumber', value)}
            keyboardType="phone-pad"
          />
        </View>
        
        {['city', 'region'].map((field) => (
          <View key={field}>
            <Text style={styles.label}>{field.replace(/([A-Z])/g, ' $1')}</Text>
            <TextInput 
              style={styles.input} 
              placeholder={field.replace(/([A-Z])/g, ' $1')} 
              value={formData[field]} 
              onChangeText={(value) => handleChange(field, value)}
            />
          </View>
        ))}
        
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  formContainer: { flex: 1, padding: 20, backgroundColor: 'white', borderRadius: 10, margin: 10 },
  logoContainer: { alignItems: 'center', marginBottom: 10 },
  logo: { width: 100, height: 100, resizeMode: 'contain' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#280300' },
  subtitle: { fontSize: 20, textAlign: 'center', marginBottom: 20, color: '#280300' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { height: 50, borderColor: '#f9622c', borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingLeft: 15 },
  phoneContainer: { flexDirection: 'row', alignItems: 'center', borderColor: '#f9622c', borderWidth: 1, borderRadius: 5, paddingLeft: 10, backgroundColor: '#fff', height: 50 },
  flag: { width: 30, height: 20, marginRight: 5 },
  callingCode: { fontSize: 16, marginLeft: 5 },
  phoneInput: { flex: 1, fontSize: 16, paddingLeft: 10 },
  button: { padding: 10, borderRadius: 10, backgroundColor: '#f9622c', alignItems: 'center', marginTop: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  linkText: { color: '#280300', textAlign: 'center', marginTop: 10, fontSize: 18, fontWeight: 'bold' }
});
