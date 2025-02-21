import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  let [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  if (!fontsLoaded) return null;

  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    if (!email || !password || emailError || passwordError) {
      Alert.alert("Error", "Please fix errors before signing in.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.28.85:8000/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token securely
        await AsyncStorage.setItem("authToken", token);

        // Redirect based on user role and approval status
        if (user.role === "vendor") {
          if (user.is_approved) {
            navigation.replace("VendorDashboard"); // Vendor dashboard
          } else {
            Alert.alert("Pending Approval", "Your vendor account is not yet approved.");
          }
        } else {
          navigation.replace("HomeScreen"); // Default for customers
        }
      }
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data?.detail || "Invalid credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.brandName}>XTREATIVE MARKET</Text>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={validateEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={validatePassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Ionicons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity
        style={[styles.signInButton, (emailError || passwordError || !email || !password) && styles.disabledButton]}
        onPress={handleLogin}
        disabled={!!emailError || !!passwordError || !email || !password}
      >
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("VendorSignup")}>
        <Text style={styles.signUp}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  brandName: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginBottom: 5,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 5,
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#000",
  },
  eyeIcon: {
    padding: 8,
  },
  signInButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  signInText: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#fff",
  },
  forgotPassword: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  signUp: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#ff6600",
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },
});

export default LoginScreen;
