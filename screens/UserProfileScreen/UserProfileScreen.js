import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function UserProfileScreen() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };
  return (
    <View>
      {/* <Text>{user.roleId}</Text> */}
      <Text onPress={handleLogout}>Logout</Text>
      {user ? <Text>{user.username}</Text> : <Text>Loading...</Text>}
    </View>
  );
}
