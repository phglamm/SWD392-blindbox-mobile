import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api/api";
import { useNavigation } from "@react-navigation/native";

export default function CheckOutScreen() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
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

  const fetchAddress = async () => {
    if (user) {
      try {
        const response = await api.get(`Address/?userId=${user.userId}`);
        const fetchedAddresses = Array.isArray(response.data)
          ? response.data
          : [response.data];
        console.log(response.data);
        setUserAddress(fetchedAddresses);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [user]);
  const totalPrice = cart.reduce(
    (total, item) => total + item.selectedOption.displayPrice * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (
      !name ||
      !address ||
      !phone ||
      !paymentMethod ||
      !province ||
      !district ||
      !ward
    ) {
      Toast.show({
        type: "error",
        text1: "Please fill in all field",
        visibilityTime: 2000,
      });
      return;
    } else {
      try {
        const requestData = {
          addressId: selectedAddressId,
          userId: user.userId,
          subTotal: totalPrice,
          shippingFee: 0,
          totalPrice: totalPrice,
          voucherId: 1,
          paymentMethod: paymentMethod,
          orderItemRequestDto: cart.map((item) => ({
            quantity: item.quantity,
            price: item.selectedOption.displayPrice,
            boxOptionId: item.selectedOption.boxOptionId,
            originPrice: item.selectedOption.originPrice,
            isOnlineSerieBox: item.selectedOption.isOnlineSerieBox,
            userRolledItemId: null,
            orderItemOpenRequestNumberDto: 0,
          })),
        };
        console.log(requestData);
        const response = await api.post("/Payment/make-Payment", requestData);
        console.log(response.data);
        Toast.show({
          type: "success",
          text1: "Order placed successfully!",
          text2: `Payment method: ${paymentMethod}`,
          visibilityTime: 2000,
        });
        clearCart();
        navigation.navigate("User", {
          screen: "ManageOrder",
        });
      } catch (error) {
        console.log(error.response.data);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Order failed",
          visibilityTime: 2000,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cart Summary</Text>
      <ScrollView style={styles.cartList}>
        {cart.length === 0 ? (
          <Text style={styles.noItemsText}>Your cart is empty.</Text>
        ) : (
          cart.map((item) => (
            <View key={item.selectedOption.boxOptionId} style={styles.cartItem}>
              <View style={styles.cartItemDetails}>
                <Image
                  source={{ uri: item.boxImage[0]?.boxImageUrl }}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <Text style={styles.cartItemText}>{item.boxName}</Text>
                  <Text>{item.selectedOption.boxOptionName}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.priceText}>
                  {item.selectedOption.displayPrice.toLocaleString()} VND
                </Text>
              </View>
            </View>
          ))
        )}

        <Text style={styles.label}>Payment Method</Text>
        <View style={styles.paymentContainer}>
          {["VNPAY", "COD"].map((method) => (
            <TouchableOpacity
              key={method}
              style={styles.radioButtonContainer}
              onPress={() => setPaymentMethod(method)}
            >
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === method && styles.radioButtonSelected,
                ]}
              />
              <Text>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Select Address</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={address}
            onValueChange={(itemValue) => {
              setSelectedAddressId(parseInt(itemValue));
              const selected = userAddress.find(
                (addr) => addr.addressId === parseInt(itemValue) // Convert the itemValue back to int
              );
              if (selected) {
                setName(selected.name);
                setAddress(selected.addressDetail);
                setPhone(selected.phoneNumber);
                setProvince(selected.province);
                setDistrict(selected.district);
                setWard(selected.ward);
              }
            }}
          >
            <Picker.Item label="Select an address" value="" />
            {userAddress.map((addr) => (
              <Picker.Item
                key={addr.addressId}
                label={
                  addr.addressDetail +
                  ", " +
                  addr.ward +
                  ", " +
                  addr.district +
                  ", " +
                  addr.province
                }
                value={addr.addressId.toString()} // Convert addressId to string for Picker
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          editable={false}
          selectTextOnFocus={false}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          editable={false}
          selectTextOnFocus={false}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={styles.label}>Ward</Text>
        <TextInput
          style={styles.input}
          value={ward}
          onChangeText={setWard}
          placeholder="Enter your ward"
          editable={false}
          selectTextOnFocus={false}
        />

        <Text style={styles.label}>District</Text>
        <TextInput
          style={styles.input}
          value={district}
          onChangeText={setDistrict}
          placeholder="Enter your district"
          editable={false}
          selectTextOnFocus={false}
        />

        <Text style={styles.label}>Province</Text>
        <TextInput
          style={styles.input}
          value={province}
          onChangeText={setProvince}
          placeholder="Enter your province"
          editable={false}
          selectTextOnFocus={false}
        />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.provisionalContainer}>
          <Text style={styles.totalText}>Provisional</Text>
          <Text style={styles.totalText}>
            {totalPrice.toLocaleString()} VND
          </Text>
        </View>
        <View style={styles.shippingContainer}>
          <Text style={styles.totalText}>Shipping</Text>
          <Text style={styles.totalText}>-</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Order</Text>
          <Text style={styles.totalText}>
            {totalPrice.toLocaleString()} VND
          </Text>
        </View>

        <View style={styles.placeContainer}>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              cart.length === 0 && styles.disabledButton,
            ]}
            onPress={handleCheckout}
            disabled={cart.length === 0}
          >
            <Text style={styles.checkoutText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  provisionalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "black",
  },
  shippingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingVertical: 10,
  },
  placeContainer: {
    width: "80%",
  },
  totalText: { fontSize: 18, fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: "#F89696",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  checkoutText: { fontSize: 16, fontWeight: "bold", color: "#fff" },

  cartList: {
    marginBottom: 200,
  },
  cartItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noItemsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
  cartItemDetails: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F89696",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  paymentContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
    // marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: "#F89696",
  },
});
