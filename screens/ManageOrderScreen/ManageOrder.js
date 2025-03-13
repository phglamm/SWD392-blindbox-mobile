import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import api from "../../api/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ManageOrder({ route }) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const selectedOrderStatus = route.params;
  const navigation = useNavigation();

  const cancelOrders = async (orderId) => {
    setLoadingCancel(true);
    try {
      const response = await api.put(`Order/cancel/${orderId}`);
      console.log(response.data);
      fetchOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCancel(false);
    }
  };

  useEffect(() => {
    if (selectedOrderStatus) {
      const statusIndex = orderStatus.findIndex(
        (status) => status.title === selectedOrderStatus.orderStatus
      );
      setSelectedStatus(statusIndex !== -1 ? statusIndex : 0);
    }
  }, [selectedOrderStatus]);

  const [orders, setOrders] = useState([]);
  const orderStatus = [
    { title: "All Order" },
    { title: "Pending" },
    { title: "Processing" },
    { title: "Shipping" },
    { title: "Arrived" },
    { title: "Cancelled" },
    { title: "Return Refund" },
  ];

  const formatDate = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(",", "");
  };

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

  const fetchOrders = async () => {
    if (user) {
      try {
        const response = await api.get(`Order?userId=${user.userId}`);
        let fetchedOrders = response.data;

        if (selectedStatus !== 0) {
          const statusTitle = orderStatus[selectedStatus].title;
          fetchedOrders = fetchedOrders.filter(
            (order) =>
              order.orderStatusDetailsSimple?.slice(-1)[0]?.statusName ===
              statusTitle
          );
        }
        fetchedOrders.sort(
          (a, b) => new Date(b.orderCreatedAt) - new Date(a.orderCreatedAt)
        );
        setOrders(fetchedOrders);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, selectedStatus]);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal={true} style={styles.statusScrollView}>
          {orderStatus.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.statusButton,
                selectedStatus === index && styles.selectedStatusButton,
              ]}
              onPress={() => setSelectedStatus(index)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  selectedStatus === index && styles.selectedStatusButtonText,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.ordersContainer}>
        <ScrollView style={styles.ordersScrollView}>
          {orders.map((order, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrderDetail", { orderId: order.orderId });
              }}
              key={index}
              style={styles.orderCard}
            >
              <View style={styles.orderHeader}>
                <View style={styles.orderHeaderInfo}>
                  <Text>Order ID: {order.orderId}</Text>
                  <Text>Order Date: {formatDate(order.orderCreatedAt)}</Text>
                </View>
                <View style={styles.orderStatus}>
                  <Text>
                    {order.orderStatusDetailsSimple?.slice(-1)[0]?.statusName ||
                      "Pending"}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                {order.orderItems.length > 0 &&
                  order.orderItems.slice(0, 1).map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.orderItem}>
                      <View style={styles.orderItemRow}>
                        <View style={styles.orderItemImageContainer}>
                          <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.orderItemImage}
                          />
                        </View>
                        <View style={styles.orderItemInfo}>
                          <Text style={styles.orderItemName}>
                            {item.boxName}
                          </Text>
                          <View style={styles.orderItemOptions}>
                            <Text style={styles.orderItemOption}>
                              Option: {item.boxOptionName}
                            </Text>
                            <Text style={styles.orderItemQuantity}>
                              x{item.quantity}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.orderSummary}>
                        <View style={styles.orderSummaryTextContainer}>
                          <Text style={styles.orderSummaryText}>
                            Order Total:{" "}
                            {order.totalPrice.toLocaleString() + " đ"}
                          </Text>
                          <Text style={styles.orderSummaryText}>
                            Payment Method: {order.paymentMethod}
                          </Text>
                        </View>
                        <View style={styles.orderActions}>
                          {order.orderStatusDetailsSimple?.slice(-1)[0]
                            ?.statusName === "Arrived" ? (
                            <>
                              <TouchableOpacity style={styles.rateButton}>
                                <Text style={styles.buttonText}>Rate</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.returnButton}>
                                <Text style={styles.buttonText}>
                                  Request to Return/Refund
                                </Text>
                              </TouchableOpacity>
                            </>
                          ) : order.orderStatusDetailsSimple?.slice(-1)[0]
                              ?.statusName === "Pending" ? (
                            <TouchableOpacity
                              onPress={() => cancelOrders(order.orderId)}
                              disabled={loadingCancel}
                              style={styles.cancelButton}
                            >
                              <Text style={styles.buttonText}>
                                {loadingCancel
                                  ? "Cancelling..."
                                  : "Cancel Order"}
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusScrollView: {
    width: "100%",
    backgroundColor: "white",
    height: "9%",
    borderColor: "black",
    shadowOffset: { width: -3, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusButton: {
    width: 100,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  selectedStatusButton: {
    borderBottomWidth: 2,
    borderBottomColor: "red",
    backgroundColor: "black",
  },
  statusButtonText: {
    color: "black",
    textAlign: "center",
  },
  selectedStatusButtonText: {
    color: "red",
  },
  ordersContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    gap: "2%",
  },
  ordersScrollView: {
    padding: "5%",
    backgroundColor: "white",
  },
  orderCard: {
    backgroundColor: "white",
    marginBottom: "8%",
    flexDirection: "column",
    borderRadius: 30,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    width: "100%",
    height: 70,
    borderBottomWidth: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  orderHeaderInfo: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "3%",
    width: "70%",
  },
  orderStatus: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  orderDetails: {
    width: "100%",
    padding: "4%",
  },
  orderItem: {
    width: "100%",
    flexDirection: "column",
  },
  orderItemRow: {
    flexDirection: "row",

  },
  orderItemImageContainer: {
    width: "30%",
    height: 80,
    marginRight: "3%",
  },
  orderItemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  orderItemInfo: {
    width: "60%",
    backgroundColor: "white",
    height: "100%",
  },
  orderItemName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  orderItemOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderItemOption: {
    color: "gray",
  },
  orderItemQuantity: {
    color: "gray",
  },
  orderSummary: {
    flexDirection: "column",
    alignItems: "center",
  },
  orderSummaryTextContainer: {
    width: "100%",
    height: 40,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: "1%",
  },
  orderSummaryText: {
    color: "black",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 15,
  },
  orderActions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "2%",
    paddingTop: "3%",
  },
  rateButton: {
    width: "20%",
    height: 40,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  returnButton: {
    width: "60%",
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
