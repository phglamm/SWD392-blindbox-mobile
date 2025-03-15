import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import api from '../../api/api';

const BoxItemDetailScreen = ({ route }) => {
  const { boxItemId } = route.params;
  const [itemDetails, setItemDetails] = useState(null);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await api.get(`/BoxItem/${boxItemId}`);
        setItemDetails(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    const fetchVotes = async () => {
      try {
        const response = await api.get(`/BoxItem/${boxItemId}/votes`);
        setVotes(response.data);
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };

    fetchItemDetails();
    fetchVotes();
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
        {/* Main Details Card */}
        <View style={styles.card}>
          {itemDetails.imageUrl && (
            <Image
              source={{ uri: itemDetails.imageUrl }}
              style={styles.image}
            />
          )}
          <Text style={styles.productName}>{itemDetails.boxItemName}</Text>
          <Text style={styles.productDescription}>{itemDetails.boxItemDescription}</Text>

          <Text style={styles.boldText}>Eyes: {itemDetails.boxItemEyes}</Text>
          <Text style={styles.boldText}>Color: {itemDetails.boxItemColor}</Text>

          <Text style={styles.boldText}>
            Secret: {itemDetails.isSecret ? 'Secret' : 'Normal'}
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
  {/* Username and Star Rating on the same line */}
  <View style={styles.voteContent}>
    <Text style={styles.voteText}>{vote.username}</Text>

    {/* Star Rating for each vote */}
    <Rating
      type="star"
      ratingCount={5} // Maximum number of stars
      imageSize={20}  // Size of the stars
      readonly
      startingValue={vote.rating}  // Rating value from the vote
      ratingBackgroundColor="transparent" // Transparent background
      ratingColor="#FFD700" // Gold color for the stars
    />
  </View>
</View>

              ))
            )}
          </View>
        </View>
      </ScrollView>

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
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
  ratingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#F5F5F5',
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  votesContainer: {
    marginTop: 20,
  },
  voteItem: {
    flexDirection: 'row',  // Ensure the username and stars are in a row
    alignItems: 'center',  // Vertically align them in the center
    marginBottom: 10,      // Add some space between vote items
  },
  voteContent: {
    flexDirection: 'row',   // Align username and stars horizontally
    alignItems: 'center',   // Vertically center the text and stars
  },
  voteText: {
    fontSize: 16,
    marginRight: 10, // Add space between username and stars
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    width: '45%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BoxItemDetailScreen;
