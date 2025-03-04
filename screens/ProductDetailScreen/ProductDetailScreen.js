import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import api from "../../api/api";
import { Picker } from "@react-native-picker/picker";
import { useFavorites } from "../../context/FavoritesContext";

export default function ProductDetailScreen({ route }) {
  const { boxId } = route.params;
  const [boxDetail, setBoxDetail] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const { width } = Dimensions.get("window");
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.boxId === boxDetail.boxId);

  useEffect(() => {
    const fetchBoxDetail = async () => {
      try {
        const response = await api.get(`Box/withDTO/${boxId}`);
        console.log("API Response:", response.data);
        const boxData = response.data || {};
        setBoxDetail(boxData);

        if (boxData.boxOptions && boxData.boxOptions.length > 0) {
          const defaultOption = boxData.boxOptions.reduce((prev, curr) =>
            prev.displayPrice < curr.displayPrice ? prev : curr
          );
          setSelectedOption(defaultOption);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchBoxDetail();
  }, []);

  return (
    <View style={styles.container}>
      {Array.isArray(boxDetail.boxImage) && boxDetail.boxImage.length > 0 ? (
        <View style={styles.imageContainer}>
          <Carousel
            loop
            width={width} // Full screen width
            height={350} // Adjust height as needed
            autoPlay
            data={boxDetail.boxImage}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.boxImageUrl }}
                style={[styles.image, { width }]}
              />
            )}
          />
        </View>
      ) : (
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          style={[styles.image, { width }]}
        />
      )}

      <View style={styles.boxTextContainer}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {boxDetail.boxName}
          </Text>
          <Text style={{ fontSize: 15 }}>Brand: {boxDetail.brandName}</Text>
        </View>
        <View>
          <Text style={styles.priceText}>
            {selectedOption?.displayPrice.toLocaleString()} VND
          </Text>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.label}>Options:</Text>
        <View style={styles.optionButtons}>
          {boxDetail.boxOptions?.map((option) => (
            <TouchableOpacity
              key={option.boxOptionId}
              style={[
                styles.optionButton,
                selectedOption?.boxOptionId === option.boxOptionId &&
                  styles.selectedOptionButton,
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption?.boxOptionId === option.boxOptionId &&
                    styles.selectedOptionText,
                ]}
              >
                {option.boxOptionName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Description</Text>
        <Text>{boxDetail.boxDescription}</Text>
      </View>

      {/* Fixed Buttons */}
      <View style={styles.fixedButtonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.favoriteButton]}
          onPress={() => toggleFavorite(boxDetail)}
        >
          {isFavorite ? (
            <Text style={styles.buttonTextFavor}>Remove from Favorites</Text>
          ) : (
            <Text style={styles.buttonTextFavor}>Add to Favorites</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cartButton]}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 350,
    resizeMode: "cover",
    alignSelf: "center",
  },

  boxTextContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionButtons: {
    flexDirection: "row",
    justifyContent: "around",
    gap: 10,
  },
  optionButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  selectedOptionButton: {
    borderColor: "#F89696",
    backgroundColor: "#F89696",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },

  descriptionContainer: {
    padding: 10,
  },

  /* Fixed Buttons */

  fixedButtonsContainer: {
    position: "absolute",
    bottom: -250,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  favoriteButton: {
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#F89696",
  },
  cartButton: {
    backgroundColor: "#F89696",
  },
  buttonTextFavor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F89696",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F89696",
  },
});
