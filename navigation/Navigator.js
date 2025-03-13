import { View, Text, TextInput } from "react-native";
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
import FavoritesScreen from "../screens/FavoritesScreen/FavoritesScreen";
import CheckOutScreen from "./../screens/CheckOutScreen/CheckOutScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen/OrderSuccessScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserMenuScreen from "../screens/UserMenuScreen/UserMenuScreen";
import ManageOrder from "../screens/ManageOrder/ManageOrder";
import AddressBook from "../screens/AddressBook/AddressBook";
import Icon from "react-native-vector-icons/AntDesign";

export default function Navigator() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const user = AsyncStorage.getItem("user");
  const SearchInput = () => {
    return (
      <View
        style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
      >
        <TextInput
          placeholder="Search"
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            width: "80%",
          }}
        />
        <View
          style={{
            width: "20%",
            paddingRight: "2%",
            justifyContent: "center",
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <Icon name="shoppingcart" size={30} style={{ marginRight: 15 }} />
          <Icon name="message1" size={30} />
        </View>
      </View>
    );
  };

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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserMenu" component={UserMenuScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="ManageOrder" component={ManageOrder} />
        <Stack.Screen name="AddressBook" component={AddressBook} />
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
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="OrderSuccess">
    //     <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ headerShown: false }} />
    //     <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
