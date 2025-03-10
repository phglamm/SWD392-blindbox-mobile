import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const OrderSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MaterialIcons name="check-circle" size={80} color="#4CAF50" />
      <Text style={styles.title}>Thanh toán thành công!</Text>
      <Text style={styles.subtitle}>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Text style={styles.buttonText}>Quay về trang chủ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.viewOrderButton]}
        onPress={() => navigation.navigate("OrderDetails")}
      >
        <Text style={styles.buttonText}>Xem đơn hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
  },
  viewOrderButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderSuccessScreen;
