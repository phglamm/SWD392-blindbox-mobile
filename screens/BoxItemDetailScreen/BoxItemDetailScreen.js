import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings'; // Import thư viện
import api from '../../api/api';

const BoxItemDetailScreen = ({ route }) => {
  const { boxItemId } = route.params; // Nhận boxItemId từ params
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await api.get(`/BoxItem/${boxItemId}`);
        setItemDetails(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [boxItemId]);

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
        {/* Card */}
        <View style={styles.card}>
          {itemDetails.imageUrl && (
            <Image
              source={{ uri: itemDetails.imageUrl }}
              style={styles.image}
            />
          )}
          <Text style={styles.productName}>{itemDetails.boxItemName}</Text>
          <Text style={styles.productDescription}>{itemDetails.boxItemDescription}</Text>

          {/* In đậm chữ Eyes và Color */}
          <Text style={styles.boldText}>Eyes: {itemDetails.boxItemEyes}</Text>
          <Text style={styles.boldText}>Color: {itemDetails.boxItemColor}</Text>

          {/* Hiển thị ngôi sao cho averageRating */}
          {/* <View style={styles.ratingContainer}>
            <Text style={styles.boldText}>Average Rating: </Text>
            <Rating
              type="star"
              ratingCount={5} // Số sao tối đa
              imageSize={30}  // Kích thước sao
              readonly
              startingValue={itemDetails.averageRating}  // Điểm đánh giá hiện tại
              ratingBackgroundColor="transparent" // Bỏ viền trắng
              ratingColor="#FFD700" // Màu sao vàng
            />
          </View>  */}

          {/* Check if currentRolledItem exists */}
          {itemDetails.currentRolledItem && (
            <Text>Current Rolled Item ID: {itemDetails.currentRolledItem.currentRolledItemId}</Text>
          )}

          {/* Check if onlineSeriesBox exists */}
          {itemDetails.onlineSeriesBox && (
            <Text>Online Series Box ID: {itemDetails.onlineSeriesBox.onlineSeriesBoxId}</Text>
          )}

          {/* Hiển thị giá trị của isSecret */}
          <Text style={styles.boldText}>
            Secret: {itemDetails.isSecret ? 'Secret' : 'Normal'}
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.boldText}>Average Rating: </Text>
            <Rating
              type="star"
              ratingCount={5} // Số sao tối đa
              imageSize={30}  // Kích thước sao
              readonly
              startingValue={itemDetails.averageRating}  // Điểm đánh giá hiện tại
              ratingBackgroundColor="transparent" // Bỏ viền trắng
              ratingColor="#FFD700" // Màu sao vàng
            />
          </View> 
        </View>
      </ScrollView>

      {/* Fixed Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#7EC0EE' }]} onPress={() => console.log('Hunt this Item')}>
          <Text style={styles.buttonText}>Hunt this Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#EEA2AD' }]} onPress={() => console.log('Vote this Item')}>
          <Text style={styles.buttonText}>Vote this Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Ensure space for buttons at the bottom
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // Chỉ dành cho Android
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold', // In đậm
    marginTop: 10,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // Optional: Background color for buttons container
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    width: '45%', // Each button takes up half of the container width
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff', // Màu chữ trắng
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BoxItemDetailScreen;
