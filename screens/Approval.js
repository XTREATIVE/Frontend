import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
      <Text style={styles.title}>Forgot Password?</Text>
      <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({ /* Your styles here */ });

export default ForgotPasswordScreen;
