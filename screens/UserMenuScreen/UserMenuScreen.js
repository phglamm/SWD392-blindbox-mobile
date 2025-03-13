import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("user");
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, gap: "3%", alignItems: "center", padding: "3%" }}>
        <View
          style={{
            height: 135,
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
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              width: "65%",
              height: "100%",
              padding: "5%",
            }}
          >
            <View>
              {user ? (
                <>
                  <Text
                    style={{ color: "red", fontWeight: "bold", fontSize: 30 }}
                  >
                    {user.username}
                  </Text>
                  <Text style={{ color: "white", fontSize: 18 }}>
                    {user.phone}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>

            <View>
              <Text
                style={{
                  color: "black",
                  padding: "1%",
                  textAlign: "center",
                  borderRadius: 15,
                  backgroundColor: "gray",
                  fontSize: 15,
                }}
              >
                Mystery Minis Member
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 90,
            width: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              paddingTop: "3%",
              paddingLeft: "3%",
            }}
          >
            Tracking my Order
          </Text>

          <View style={{ flexDirection: "row", width: "100%", height: "70%" }}>
            {trackingItems.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ManageOrder", {
                    orderStatus: item.title,
                  });
                }}
                key={index}
                style={{
                  marginTop: "1%",
                  backgroundColor: "white",
                  height: "100%",
                  width: "25%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon2 name={item.icon} size={30} />
                <Text style={{ textAlign: "center" }}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={{
            borderRadius: 8,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "2%",
            flexWrap: "wrap",
            height: 250,
            width: "100%",
            backgroundColor: "white",
            paddingBottom: "2%",
          }}
        >
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
              style={{
                backgroundColor: "white",
                height: "33%",
                width: "49%",
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name={item.icon} size={30} />
              <Text style={{ textAlign: "center", paddingTop: "2%" }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
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
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              paddingTop: "3%",
              paddingLeft: "3%",
              paddingBottom: "2%",
            }}
          >
            Support
          </Text>

          {supportItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.title === "Log Out") {
                  handleLogout();
                }
              }}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "2%",
                backgroundColor: "white",
                height: "33%",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{}}>{item.title}</Text>
              <Text style={{ textAlign: "right" }}> {">"} </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
