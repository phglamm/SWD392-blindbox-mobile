import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserMenuScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);
  const menuItems = [
    { title: "My Profile", link: "UserProfile" },
    { title: "Address Book", link: "AddressBook" },
    { title: "My Order", link: "ManageOrder" },
    { title: "My Collection" },
    { title: "Contact Us" },
    { title: "Setting" },
  ];

  const trackingItems = [
    { title: "Pending" },
    { title: "Processing" },
    { title: "Shipping" },
    { title: "Rating" },
  ];
  const supportItems = [
    { title: "Help Center" },
    { title: "Chat With Staff" },
    { title: "Log Out" },
  ];

  return (
    <View style={{ flex: 1, gap: "3%", alignItems: "center", padding: "3%" }}>
      <View
        style={{
          height: "20%",
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
              <Text>Loading...</Text>
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
        <View
          style={{
            width: "35%",
            height: "100%",
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              backgroundColor: "red",
            }}
          >
            Avatar
          </Text>
        </View>
      </View>

      <View
        style={{
          height: "13%",
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

        <View style={{ flexDirection: "row", width: "100%", height: "80%" }}>
          {trackingItems.map((item, index) => (
            <TouchableOpacity
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
              <Text style={{ textAlign: "center" }}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "2%",
          flexWrap: "wrap",
          height: "20%",
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
            <Text style={{ textAlign: "center", paddingTop: "5%" }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: "20%", width: "100%", backgroundColor: "white" }}>
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
  );
}
