import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const VendorRegistration = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.brandName}>REGISTER AS A VENDOR</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.subHeader}>Personal Information</Text>
          <TextInput style={styles.input} placeholder="First Name" />
          <TextInput style={styles.input} placeholder="Last Name" />
          <TextInput style={styles.input} placeholder="Phone number" keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry autoCapitalize="none" />
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Shop Information</Text>
          <TextInput style={styles.input} placeholder="Shop Name" />
          <TextInput style={styles.input} placeholder="Shop's Address" />
          <TextInput style={styles.input} placeholder="Shop Description" multiline />
        </View>

        
        // Inside VendorRegistration, modify the Registration button to navigate to AgreeScreen
<TouchableOpacity 
  style={styles.button} 
  onPress={() => navigation.navigate('TremScreen')}>
  <Text style={styles.buttonText}>I Agree to the Terms and Conditions</Text>
</TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Thank you for registering!{"\n"}
            </Text>
            
            {/* Success Icon for submission */}
            <Icon name="check-circle" size={40} color="green" style={styles.icon} />
            
            <Text style={styles.pendingText}>
              Registration is pending...
            </Text>

            {/* Pending Icon */}
            <Icon name="hourglass-half" size={40} color="orange" style={styles.icon} />

            <TouchableOpacity style={styles.button} onPress={() => { 
              setModalVisible(false); 
              navigation.navigate("Pending"); // Navigate to Pending screen
            }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  scrollViewContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  section: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxText: {
    fontFamily: "Poppins_400Regular",
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#ff6600",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    height: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Poppins_400Regular",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dim background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Poppins_400Regular",
  },
  pendingText: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    fontFamily: "Poppins_400Regular",
  },
  icon: {
    marginBottom: 10,
  },
});

export default VendorRegistration;
