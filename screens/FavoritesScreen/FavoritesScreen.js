import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.boxId?.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <Image
                  source={{
                    uri:
                      item?.boxImage &&
                      Array.isArray(item.boxImage) &&
                      item.boxImage.length > 0
                        ? item.boxImage[0]?.boxImageUrl
                        : "https://via.placeholder.com/100", // Fallback image URL
                  }}
                  style={styles.image}
                />
                <Text style={styles.boxName}>{item.boxName}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonRemove}
                  onPress={() => toggleFavorite(item)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={() =>
                    navigation.navigate("Product", {
                      screen: "ProductDetailScreen",
                      params: { boxId: item.boxId },
                    })
                  }
                >
                  <Text style={styles.buttonTextView}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>No favorites yet</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    backgroundColor: "white",
    elevation: 6,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    // marginVertical: 5,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 10,
  },
  buttonRemove: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#F89696",
    borderRadius: 5,
  },
  buttonView: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F89696",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonTextView: {
    color: "#F89696",
    fontWeight: "bold",
  },

  boxName: {
    width: 130,
    fontWeight: "bold",
    fontSize: 16,
  },
});
