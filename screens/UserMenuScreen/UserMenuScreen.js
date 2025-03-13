import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserMenuScreen() {
  const navigation = useNavigation();
  const menuItems = [
    { title: "My Profile", link: "UserProfile", icon: "profile" },
    { title: "Address Book", link: "AddressBook", icon: "enviromento" },
    { title: "My Order", link: "ManageOrder", icon: "save" },
    { title: "My Favorites", icon: "hearto", link: "Your Favorites Box" },
    { title: "Contact Us", icon: "customerservice" },
    { title: "Setting", icon: "setting" },
  ];
  const [user, setUser] = useState(null);

  const trackingItems = [
    { title: "Pending", icon: "archive-clock-outline" },
    { title: "Processing", icon: "package-variant-closed" },
    { title: "Shipping", icon: "truck-fast-outline" },
    { title: "Rating", icon: "star-circle-outline" },
  ];
  const supportItems = [
    { title: "Help Center" },
    { title: "Chat With Staff" },
    { title: "Log Out" },
  ];

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
    // Add your logout logic here
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <View>
              {user ? (
                <>
                  <Text style={styles.username}>{user.username}</Text>
                  <Text style={styles.userPhone}>{user.phone}</Text>
                </>
              ) : (
                <></>
              )}
            </View>
            <View>
              <Text style={styles.membership}>Mystery Minis Member</Text>
            </View>
          </View>
        </View>

        <View style={styles.trackingContainer}>
          <Text style={styles.trackingTitle}>Tracking my Order</Text>
          <View style={styles.trackingItems}>
            {trackingItems.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ManageOrder", {
                    orderStatus: item.title,
                  });
                }}
                key={index}
                style={styles.trackingItem}
              >
                <Icon2 name={item.icon} size={30} />
                <Text style={styles.trackingItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.link === "UserProfile") {
                  navigation.navigate(item.link, {
                    email: user.email,
                  });
                } else if (item.link === "ManageOrder") {
                  navigation.navigate(item.link, { userId: user.userId });
                } else {
                  navigation.navigate(item.link);
                }
              }}
              style={styles.menuItem}
            >
              <Icon name={item.icon} size={30} />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.supportContainer}>
          <Text style={styles.supportTitle}>Support</Text>
          {supportItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.title === "Log Out") {
                  handleLogout();
                }
              }}
              style={styles.supportItem}
            >
              <Text>{item.title}</Text>
              <Text style={styles.supportItemArrow}> {">"} </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: "3%",
    alignItems: "center",
    padding: "3%",
  },
  userInfoContainer: {
    height: 145,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  userInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "65%",
    height: "100%",
    padding: "5%",
  },
  username: {
    color: "red",
    fontWeight: "bold",
    fontSize: 30,
  },
  userPhone: {
    color: "white",
    fontSize: 18,
  },
  membership: {
    color: "black",
    padding: "1%",
    textAlign: "center",
    borderRadius: 15,
    backgroundColor: "gray",
    fontSize: 15,
  },
  trackingContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    padding: "3%",
  },
  trackingTitle: {
    color: "black",
    fontWeight: "bold",
    paddingBottom: "1%",
  },
  trackingItems: {
    flexDirection: "row",
    width: "100%",
    height: "70%",
  },
  trackingItem: {
    marginTop: "1%",
    height: "100%",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  trackingItemText: {
    textAlign: "center",
  },
  menuContainer: {
    borderRadius: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "2%",
    flexWrap: "wrap",

    width: "100%",
    backgroundColor: "white",
    paddingBottom: "2%",
  },
  menuItem: {
    backgroundColor: "white",
    height: 100,
    width: "49%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    textAlign: "center",
    paddingTop: "2%",
  },
  supportContainer: {
    borderRadius: 8,
    height: 160,
    width: "100%",
    backgroundColor: "white",
    marginBottom: "20%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  supportTitle: {
    color: "black",
    fontWeight: "bold",
    paddingTop: "3%",
    paddingLeft: "3%",
    paddingBottom: "2%",
  },
  supportItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
    height: "33%",
    width: "100%",
    alignItems: "center",
  },
  supportItemArrow: {
    textAlign: "right",
  },
});
