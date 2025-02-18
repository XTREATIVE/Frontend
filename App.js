import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import VendorRegistration from "./screens/VendorRegistration";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ApprovalModal from "./screens/Approval";
import NewPasswordScreen from "./screens/NewPasswordScreen";
import PasswordChanged from "./screens/PasswordChanged";
import TremScreen from "./screens/TremScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="VendorSignup" component={VendorRegistration} />
        <Stack.Screen name="TremScreen" component={TremScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Approval" component={ApprovalModal} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
