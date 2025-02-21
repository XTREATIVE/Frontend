import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function TutorialPage({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Welcome to Xtreative Market</Text>
      <Text style={styles.subtitle}>Here's how you can get started:</Text>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>1. Browse Products</Text>
        <Text style={styles.stepDescription}>
          Explore a wide variety of creative products, from digital designs to handmade crafts.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>2. Add to Cart</Text>
        <Text style={styles.stepDescription}>
          Once you find a product you like, simply click on the "Add to Cart" button to start your shopping.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>3. Checkout</Text>
        <Text style={styles.stepDescription}>
          After adding products to your cart, go to your cart and proceed to checkout to complete your purchase.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>4. Track Your Orders</Text>
        <Text style={styles.stepDescription}>
          Once your order is placed, you can track its status under your profile page.
        </Text>
      </View>

      {/* Finish Button */}
      <TouchableOpacity style={styles.finishButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Finish Tutorial</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  stepContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  stepDescription: {
    fontSize: 16,
    color: '#555',
  },
  finishButton: {
    backgroundColor: '#f9622c', // Dark Orange
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
