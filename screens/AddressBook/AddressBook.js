import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import AddressPOST from "./AddressPOST";
import AddressPUT from "./AddressPUT";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddressBook() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
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

  const fetchAddress = async () => {
    if (user) {
      try {
        //   const response = await api.get(`/Address/?userId=${user.userId}`);
        const response = await api.get(`Address/?userId=${user.userId}`);
        const fetchedAddresses = Array.isArray(response.data)
          ? response.data
          : [response.data];
        console.log(response.data);
        setAddresses(fetchedAddresses);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [user, addNewAddress]);

  return addNewAddress ? (
    <AddressPOST setAddAddress={setAddNewAddress} />
  ) : updateAddress ? (
    <AddressPUT
      setUpdateAddress={setUpdateAddress}
      selectedAddress={selectedAddress}
    />
  ) : (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
      <ScrollView
        style={{ width: "100%", height: "100%", backgroundColor: "white" }}
      >
        {addresses.map((address, index) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedAddress(address);
              setUpdateAddress(true);
            }}
            key={index}
            style={{
              width: "100%",
              height: 100,
              backgroundColor: "white",
              padding: "3%",
              borderBottomWidth: 1,
              borderColor: "gray",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    paddingRight: "3%",
                    textAlign: "center",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 18,
                    borderRightWidth: 1,
                  }}
                >
                  {address.name}
                </Text>
                <Text
                  style={{
                    paddingLeft: "3%",
                    textAlign: "center",
                    color: "gray",
                    fontSize: 18,
                  }}
                >
                  {" "}
                  {address.phoneNumber}
                </Text>
              </View>
              <Text style={{ color: "gray", fontSize: 14 }}>
                {" "}
                {address.addressDetail}
              </Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                {address.ward}, {address.district}, {address.province}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: "3%",
          }}
        >
          <TouchableOpacity
            onPress={() => setAddNewAddress(true)}
            style={{
              padding: "1%",
              borderRadius: 50,
              width: "40%",
              height: 70,
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
