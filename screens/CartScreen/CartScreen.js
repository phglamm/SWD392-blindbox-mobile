import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useCart } from "../../context/CartContext";

export default function CartScreen() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.selectedOption.displayPrice * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) =>
            `${item.boxId}-${item.selectedOption.boxOptionId}`
          }
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image
                source={{ uri: item.boxImage[0]?.boxImageUrl }}
                style={styles.image}
              />
              <View style={styles.details}>
                <Text style={styles.boxName}>{item.boxName}</Text>
                <Text>{item.selectedOption.boxOptionName}</Text>
                <Text style={styles.price}>
                  {item.selectedOption.displayPrice.toLocaleString()} VND
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    removeFromCart(item.boxId, item.selectedOption.boxOptionId)
                  }
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    decreaseQuantity(
                      item.boxId,
                      item.selectedOption.boxOptionId
                    )
                  }
                >
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    increaseQuantity(
                      item.boxId,
                      item.selectedOption.boxOptionId
                    )
                  }
                >
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.orderSummary}>
        <View style={styles.provisionalContainer}>
          <Text style={styles.totalText}>Provisonal</Text>
          <Text style={styles.totalText}>
            {totalPrice.toLocaleString()} VND
          </Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>
            {totalPrice.toLocaleString()} VND
          </Text>
        </View>
        <View style={styles.proceedContainer}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  emptyText: { textAlign: "center", fontSize: 16, marginTop: 20 },
  cartItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  image: { width: 80, height: 80, marginRight: 10 },
  details: { flex: 1 },
  boxName: { fontSize: 18, fontWeight: "bold" },
  price: { color: "#F89696", fontSize: 16, fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  quantityButton: { fontSize: 20, paddingHorizontal: 10 },
  quantityText: { fontSize: 18, marginHorizontal: 10 },
  removeText: { color: "red", marginTop: 5 },

  orderSummary: {
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

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    paddingVertical: 10,
  },
  proceedContainer: { width: "80%" },
  provisionalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
  },
  totalText: { fontSize: 15, fontWeight: "bold", color: "#333" },
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
});
