import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import axios from "axios";

const VendorRegistration = ({ navigation }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    shop_name: "",
    shop_address: "",
    shop_description: "",
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // const handleRegister = async () => {
  //   try {
  //     console.log("Sending registration data:", form);
  //     const response = await axios.post("http://192.168.28.85:8000/register/vendor/", form);
      
  //     if (response.data.success) {
  //       Alert.alert("Success", "Registration submitted! Check your email for the verification code.");
  //       setRegisteredEmail(form.email);
  //       setIsVerificationStep(true); // Redirect to verification step
  //       setVerificationError(""); // Clear any previous error
  //     } else {
  //       Alert.alert("Error", response.data.message || "Registration failed.");
  //     }
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //     Alert.alert("Error", error.response?.data?.error || "Registration failed.");
  //   }
  // };


  const handleRegister = async () => {
    try {
        console.log("Sending registration data:", form);

        const response = await fetch("http://192.168.28.85:8000/register/vendor/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await response.json();

        if (response.ok && data.success) {
            Alert.alert("Success", "Registration submitted! Check your email for the verification code.");
            setRegisteredEmail(form.email);
            setIsVerificationStep(true); // Redirect to verification step
            setVerificationError(""); // Clear any previous error
        } else {
            Alert.alert("Error", data.message || "Registration failed.");
        }
    } catch (error) {
        console.error("Registration error:", error);
        Alert.alert("Error", "Registration failed. Please try again.");
    }
};


  const handleVerify = async () => {
    try {
      console.log("Verifying email:", registeredEmail, "with code:", verificationCode);
      const response = await axios.post("http://192.168.28.85:8000/verify-otp", {
        email: registeredEmail,
        verification_code: verificationCode,
      });

      if (response.data.success) {
        Alert.alert("Success", "Verification successful! Redirecting to dashboard.");
        navigation.navigate("Dashboard"); // Navigate to dashboard after successful verification
      } else {
        setVerificationError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationError(error.response?.data?.error || "Invalid verification code.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.brandName}>
          {isVerificationStep ? "Verify Your Account" : "Register as a Vendor"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {!isVerificationStep ? (
          <>
            <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => handleChange("username", text)} />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={(text) => handleChange("email", text)} />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" onChangeText={(text) => handleChange("phone_number", text)} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => handleChange("password", text)} />
            <TextInput style={styles.input} placeholder="Shop Name" onChangeText={(text) => handleChange("shop_name", text)} />
            <TextInput style={styles.input} placeholder="Shop Address" onChangeText={(text) => handleChange("shop_address", text)} />
            <TextInput style={styles.input} placeholder="Shop Description" multiline onChangeText={(text) => handleChange("shop_description", text)} />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.infoText}>Enter the verification code sent to your email.</Text>
            <TextInput
              style={styles.input}
              placeholder="Verification Code"
              keyboardType="numeric"
              onChangeText={setVerificationCode}
            />

            {verificationError ? <Text style={styles.errorText}>{verificationError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  logoContainer: { alignItems: "center", marginVertical: 10 },
  logo: { width: 120, height: 50, resizeMode: "contain" },
  brandName: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 5 },
  scrollViewContent: { paddingHorizontal: 15, paddingVertical: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, fontSize: 16, marginBottom: 10, backgroundColor: "#fff" },
  button: { backgroundColor: "#ff6600", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  infoText: { textAlign: "center", fontSize: 16, marginBottom: 10, color: "#555" },
  errorText: { color: "red", textAlign: "center", marginBottom: 10, fontSize: 14 },
});

export default VendorRegistration;
