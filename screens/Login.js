import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  let [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  if (!fontsLoaded) return null;

  // let [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  // if (!fontsLoaded) return null;

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
    // Implement authentication logic here
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
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Ionicons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.signInButton, (email === "" || password === "") && styles.disabledButton]}
        onPress={handleLogin}
        disabled={email === "" || password === ""}
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
    marginBottom: 15,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 20,
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
    backgroundColor: "#000",
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
});

export default LoginScreen;
