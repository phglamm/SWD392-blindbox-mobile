import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "./../screens/HomeScreen/HomeScreen";
import ProductDetailScreen from "./../screens/ProductDetailScreen/ProductDetailScreen";
import ProductScreen from "./../screens/ProductScreen/ProductScreen";
import BoxItemScreen from "./../screens/BoxItemScreen/BoxItemScreen";
import BoxItemDetailScreen from "./../screens/BoxItemDetailScreen/BoxItemDetailScreen";
import UserProfileScreen from "./../screens/UserProfileScreen/UserProfileScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "./../screens/RegisterScreen/RegisterScreen";
import CartScreen from "./../screens/CartScreen/CartScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function Navigator() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    );
  };
  const ProductStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
      </Stack.Navigator>
    );
  };
  const BoxItemStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="BoxItem" component={BoxItemScreen} />
        <Stack.Screen name="BoxItemDetail" component={BoxItemDetailScreen} />
      </Stack.Navigator>
    );
  };
  const UserStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  };
  const CartStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    );
  };
  const MainTab = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Product"
          component={ProductStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Box Item"
          component={BoxItemStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="User"
          component={UserStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Cart"
          component={CartStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
}
