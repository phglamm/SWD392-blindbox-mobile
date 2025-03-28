import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Rating } from "react-native-ratings";
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const BoxItemDetailScreen = ({ route }) => {
  const { boxItemId } = route.params;
  const [itemDetails, setItemDetails] = useState(null);
  const [votes, setVotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for Modal visibility
  const [userRating, setUserRating] = useState(0); // State to store selected rating
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const fetchItemDetails = async () => {
    try {
      const response = await api.get(`/BoxItem/withDTO/${boxItemId}`);
      setItemDetails(response.data);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
    fetchItemDetails();
    fetchVotes();
  }, [boxItemId]);

  const fetchVotes = async () => {
    try {
      const response = await api.get(`/BoxItem/${boxItemId}/votes`);
      console.log(response.data);
      setVotes(response.data);
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  // Hàm submit vote
  const submitVote = async () => {
    if (user) {
      try {
        // Nếu chưa vote, gửi yêu cầu vote mới
        const response = await api.post("/BoxItem/vote", {
          boxItemId: boxItemId,
          userId: user.userId, // Sử dụng userId lấy từ thông tin người dùng
          rating: userRating,
        });

        console.log("Vote submitted successfully:", response);
        setModalVisible(false); // Đóng modal sau khi gửi
        fetchItemDetails();
        fetchVotes(); // Cập nhật danh sách votes
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Vote submitted successfully.",
        });
      } catch (error) {
        console.error(
          "Error submitting vote:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "You need to login to vote.",
      });
      console.log("You need to login to vote.");
    }
  };

  if (!itemDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Main Details Card */}
        <View style={styles.card}>
          {itemDetails.imageUrl && (
            <Image
              source={{ uri: itemDetails.imageUrl }}
              style={styles.image}
            />
          )}
          <Text style={styles.productName}>{itemDetails.boxItemName}</Text>
          <Text style={styles.productDescription}>
            {itemDetails.boxItemDescription}
          </Text>

          <Text style={styles.boldText}>Eyes: {itemDetails.boxItemEyes}</Text>
          <Text style={styles.boldText}>Color: {itemDetails.boxItemColor}</Text>

          <Text style={styles.boldText}>
            Secret: {itemDetails.isSecret ? "Secret" : "Normal"}
          </Text>
        </View>

        {/* Rating Card */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingCardTitle}>Average Rating</Text>
          <View style={styles.ratingContainer}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={50}
              readonly
              startingValue={itemDetails.averageRating}
              ratingBackgroundColor="transparent"
              ratingColor="#FFD700"
            />
          </View>

          {/* Votes Section */}
          <View style={styles.votesContainer}>
            <Text style={styles.boldText}>Votes:</Text>
            {votes.length === 0 ? (
              <Text>No votes available yet.</Text>
            ) : (
              votes.map((vote, index) => (
                <View key={index} style={styles.voteItem}>
                  <View style={styles.voteContent}>
                    <Text style={styles.voteText}>{vote.username}</Text>
                    <Rating
                      type="star"
                      ratingCount={5}
                      imageSize={20}
                      readonly
                      startingValue={vote.rating}
                      ratingBackgroundColor="transparent"
                      ratingColor="#FFD700"
                    />
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Vote Button */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#7EC0EE" }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Vote this Item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#EEA2AD" }]}
          onPress={() => {
            if (itemDetails) {
              // Navigate to the product detail screen with the product id
              navigation.navigate("ProductDetailScreen", {
                boxId: itemDetails.belongBox.boxId,
              });
            }
          }}
        >
          <Text style={styles.buttonText}>Hunt this Item</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Rating */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Vote Item</Text>
            <Text>Rating:</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={40}
              onFinishRating={setUserRating} // Update the userRating state when rating is finished
              startingValue={userRating}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={submitVote}>
                <Text>Vote</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Adjust padding to allow space for buttons
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#F5F5F5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  productDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  ratingCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#F5F5F5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  ratingCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold",
    marginTop: 10,
  },
  votesContainer: {
    marginTop: 20,
  },
  voteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  voteContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  voteText: {
    fontSize: 16,
    marginRight: 10,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20, // Keep buttons at the bottom of the screen
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    width: "45%",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#7EC0EE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default BoxItemDetailScreen;
