import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "../../api/api";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const OrderDetailScreen = ({ route }) => {
  const orderId = route.params.orderId;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCancel, setLoadingCancel] = useState(false);

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

  const statusIcons = {
    "All Order": "format-list-bulleted",
    Pending: "clock-outline",
    Processing: "cogs",
    Shipping: "truck-fast",
    Arrived: "check-circle-outline",
    Cancelled: "cancel",
    "Return Refund": "backup-restore",
  };

  const formatDateHeader = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
    };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(",", "");
  };

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

  const fetchOrders = async () => {
    try {
      const response = await api.get("Order");
      const fetchedOrders = response.data.filter(
        (order) => order.orderId === orderId
      );
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orderId]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          orders.map((order) => (
            <View key={order.orderId} style={styles.orderContainer}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderHeaderText}>
                  Your Order is{" "}
                  {order.orderStatusDetailsSimple?.slice(-1)[0]?.statusName ||
                    "Pending"}
                  {order.orderStatusDetailsSimple?.slice(-1)[0]?.statusName ===
                  "Arrived"
                    ? ` at ${formatDateHeader(
                        order.orderStatusDetailsSimple.slice(-1)[0].updatedAt
                      )}`
                    : ""}
                </Text>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderIdText}>
                    Order ID: {order.orderId}
                  </Text>
                  <Text>Order Status</Text>
                  <View style={styles.statusContainer}>
                    {order.orderStatusDetailsSimple.map((status, index) => (
                      <View key={index} style={styles.statusRow}>
                        <Icon2
                          name={
                            statusIcons[status.statusName] ||
                            "help-circle-outline"
                          }
                          size={30}
                          color="black"
                          style={styles.statusIcon}
                        />
                        <View style={styles.statusTextContainer}>
                          <Text>{status.statusName}</Text>
                          <Text>{formatDate(status.updatedAt)}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.deliveryAddress}>
                  <Text style={styles.deliveryAddressTitle}>
                    Delivery Address
                  </Text>
                  {order.address ? (
                    <>
                      <Text style={styles.addressName}>
                        {order.address.name}
                      </Text>
                      <Text style={styles.addressPhone}>
                        {order.address.phoneNumber}
                      </Text>
                      <Text style={styles.addressDetail}>
                        {order.address.addressDetail}
                      </Text>
                      <Text style={styles.addressDetail}>
                        {order.address.ward} {order.address.district}{" "}
                        {order.address.province}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.addressName}>No address provided</Text>
                  )}
                </View>
              </View>

              <View style={styles.orderDetailContainer}>
                <View style={styles.orderDetailHeader}>
                  <Text style={styles.orderDetailTitle}>Order Detail</Text>
                </View>
                {order.orderItems.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <View style={styles.orderItemRow}>
                      <View style={styles.orderItemImageContainer}>
                        <Image
                          source={{ uri: item.imageUrl }}
                          style={styles.orderItemImage}
                        />
                      </View>
                      <View style={styles.orderItemInfo}>
                        <Text style={styles.orderItemName}>{item.boxName}</Text>
                        <Text style={styles.orderItemOption}>
                          {item.boxOptionName}
                        </Text>
                        <Text style={styles.orderItemQuantity}>
                          x {item.quantity}
                        </Text>
                      </View>
                      <View style={styles.orderItemPriceContainer}>
                        <Text style={styles.orderItemPrice}>
                          {typeof item.orderPrice === "number"
                            ? item.orderPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                            : "N/A"}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
                <View style={styles.orderSummary}>
                  <View>
                    <Text style={styles.summaryTextLeft}>Payment Method:</Text>
                    <Text style={styles.summaryTextLeft}>Subtotal:</Text>
                    <Text style={styles.summaryTextLeft}>Shipping Fee: </Text>
                    <Text style={styles.summaryTextLeft}>Order Total: </Text>
                  </View>
                  <View>
                    <Text style={styles.summaryText}>
                      {order.paymentMethod}
                    </Text>
                    <Text style={styles.summaryText}>
                      {order.subTotal.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                    <Text style={styles.summaryText}>
                      {order.shippingFee.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                    <Text style={styles.summaryText}>
                      {order.totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  </View>
                </View>
                <View style={styles.orderActions}>
                  {order.orderStatusDetailsSimple?.slice(-1)[0]?.statusName ===
                  "Arrived" ? (
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
                        {loadingCancel ? "Cancelling..." : "Cancel Order"}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
    alignItems: "center",
    width: "100%",
  },
  orderContainer: {
    width: "100%",

    borderRadius: 20,
    marginBottom: 10,
  },
  orderHeader: {
    backgroundColor: "#F08080",
    height: 60,
    justifyContent: "center",
    padding: "3%",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  orderHeaderText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDetails: {
    backgroundColor: "white",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "column",
  },
  orderInfo: {
    padding: "3%",
    borderBottomWidth: 0.2,
    borderColor: "gray",
  },
  orderIdText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statusContainer: {
    marginTop: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusIcon: {
    marginRight: 10,
  },
  statusTextContainer: {
    flexDirection: "column",
    width: 150,
  },
  deliveryAddress: {
    padding: "3%",
    flexDirection: "column",
  },
  deliveryAddressTitle: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "bold",
  },
  addressRow: {
    flexDirection: "row",
  },
  addressName: {
    fontWeight: "600",
    paddingRight: "2%",
    fontSize: 14,
  },
  addressPhone: {
    fontWeight: "600",
    paddingLeft: "2%",
    fontSize: 14,
  },
  addressDetail: {
    color: "gray",
    fontSize: 12,
  },
  orderDetailContainer: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  orderDetailHeader: {
    borderBottomWidth: 0.5,
    borderColor: "gray",
    height: 50,
    padding: "3%",
    flexDirection: "column",
    justifyContent: "center",
  },
  orderDetailTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  orderItem: {
    padding: "2%",
  },
  orderItemRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "gray",
    alignItems: "center",
    paddingBottom: 10,
  },
  orderItemImageContainer: {
    width: "30%",
    marginRight: 10,
  },
  orderItemImage: {
    width: "100%",
    height: 90,
    resizeMode: "cover",
    borderRadius: 10,
  },
  orderItemInfo: {
    width: "30%",
    flexDirection: "column",
  },
  orderItemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  orderItemOption: {
    color: "gray",
    fontSize: 12,
  },
  orderItemQuantity: {
    color: "gray",
    fontSize: 12,
  },
  orderItemPriceContainer: {
    width: "40%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  orderItemPrice: {
    fontWeight: "bold",
    fontSize: 12,
  },
  orderSummary: {
    padding: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "right",
    fontWeight: "bold",
    color: "#A9A9A9",
  },
  summaryTextLeft: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "bold",
    color: "#A9A9A9",
  },
  orderActions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "2%",
    paddingTop: "3%",
    marginBottom: "3%",
    paddingRight: "3%",
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
    width: "100%",
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OrderDetailScreen;
