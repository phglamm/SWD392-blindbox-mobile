import React, { useEffect, useState } from "react";
import HomeScreen from "./../screens/HomeScreen/HomeScreen";
import ProductDetailScreen from "./../screens/ProductDetailScreen/ProductDetailScreen";
import ProductScreen from "./../screens/ProductScreen/ProductScreen";
import BoxItemScreen from "./../screens/BoxItemScreen/BoxItemScreen";
import BoxItemDetailScreen from "./../screens/BoxItemDetailScreen/BoxItemDetailScreen";
import UserProfileScreen from "./../screens/UserProfileScreen/UserProfileScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "./../screens/RegisterScreen/RegisterScreen";
import CartScreen from "./../screens/CartScreen/CartScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "../screens/FavoritesScreen/FavoritesScreen";
import CheckOutScreen from "./../screens/CheckOutScreen/CheckOutScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen/OrderSuccessScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserMenuScreen from "../screens/UserMenuScreen/UserMenuScreen";
import ManageOrder from "../screens/ManageOrderScreen/ManageOrder";
import AddressBook from "../screens/AddressBook/AddressBook";
import SearchInput from "../components/SearchInput/SearchInput";
import OrderDetailScreen from "./../screens/OrderDetailScreen/OrderDetailScreen";
import BlogScreen from "../screens/BlogScreen/BlogScreen";

export default function Navigator() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MysteryMinis"
          component={HomeScreen}
          options={{
            headerTitle: () => <SearchInput />,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
      </Stack.Navigator>
    );
  };
  const ProductStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Our Product"
          component={ProductScreen}
          options={{
            headerTitle: () => <SearchInput />,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{ headerShown: false }}
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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageOrder"
          component={ManageOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddressBook"
          component={AddressBook}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Your Favorites Box"
          component={FavoritesScreen}
          options={{ headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    );
  };
  const CartStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Your cart"
          component={CartScreen}
          options={{ headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Check out"
          component={CheckOutScreen}
          options={{ headerTitleAlign: "center" }}
        />
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
    // <NavigationContainer>
    //   <MainTab />
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BlogScreen">
        <Stack.Screen name="BlogScreen" component={BlogScreen} options={{ headerShown: true }} />
        <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
