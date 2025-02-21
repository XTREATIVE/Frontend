import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";

const VendorRegistration = ({ navigation }) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    shop_name: "",
    shop_address: "",
    shop_description: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Check if all required fields are filled
    Object.keys(form).forEach((key) => {
      if (!form[key] && key !== "termsAccepted") {
        valid = false;
        errors[key] = `${key.replace('_', ' ')} is required.`;
      }
    });

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (form.email && !emailRegex.test(form.email)) {
      valid = false;
      errors.email = "Invalid email format.";
    }

    // Validate phone number (basic check for length)
    if (form.phone_number && form.phone_number.length < 10) {
      valid = false;
      errors.phone_number = "Phone number must be at least 10 digits.";
    }

    // Set error state
    setErrors(errors);

    return valid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

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
        Alert.alert("Success", "Registration submitted!");
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.brandName}>Register as a Vendor</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TextInput
          style={[styles.input, errors.first_name && { borderColor: "red" }]}
          placeholder="First Name"
          onChangeText={(text) => handleChange("first_name", text)}
        />
        {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}

        <TextInput
          style={[styles.input, errors.last_name && { borderColor: "red" }]}
          placeholder="Last Name"
          onChangeText={(text) => handleChange("last_name", text)}
        />
        {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}

        <TextInput
          style={[styles.input, errors.email && { borderColor: "red" }]}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => handleChange("email", text)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.phone_number && { borderColor: "red" }]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          onChangeText={(text) => handleChange("phone_number", text)}
        />
        {errors.phone_number && <Text style={styles.errorText}>{errors.phone_number}</Text>}

        <TextInput
          style={[styles.input, errors.password && { borderColor: "red" }]}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => handleChange("password", text)}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TextInput
          style={[styles.input, errors.shop_name && { borderColor: "red" }]}
          placeholder="Shop Name"
          onChangeText={(text) => handleChange("shop_name", text)}
        />
        {errors.shop_name && <Text style={styles.errorText}>{errors.shop_name}</Text>}

        <TextInput
          style={[styles.input, errors.shop_address && { borderColor: "red" }]}
          placeholder="Shop Address"
          onChangeText={(text) => handleChange("shop_address", text)}
        />
        {errors.shop_address && <Text style={styles.errorText}>{errors.shop_address}</Text>}

        <TextInput
          style={[styles.input, errors.shop_description && { borderColor: "red" }]}
          placeholder="Shop Description"
          multiline
          onChangeText={(text) => handleChange("shop_description", text)}
        />
        {errors.shop_description && <Text style={styles.errorText}>{errors.shop_description}</Text>}

        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.termsButton}
            onPress={() => navigation.navigate("TremScreen")} // Navigate to the Terms screen
          >
            <Text style={styles.termsText}>Read Terms and Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleChange("termsAccepted", !form.termsAccepted)}
          >
            <Text style={styles.checkboxText}>
              {form.termsAccepted ? "✔" : "❒"} I accept the Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  termsContainer: { marginTop: 10, marginBottom: 20 },
  termsButton: { padding: 10 },
  termsText: { fontSize: 14, color: "#007aff", textDecorationLine: "underline" },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkboxText: { fontSize: 14 },
});

export default VendorRegistration;
