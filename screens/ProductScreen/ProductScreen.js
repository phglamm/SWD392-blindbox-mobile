import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Add this import for the icon

export default function ProductScreen({ route }) {
  const navigation = useNavigation();
  const [boxes, setBoxes] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const search = route?.params?.search || "";
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    fetchBoxes();
  }, []);

  useEffect(() => {
    filterBoxes();
  }, [boxes, searchInput]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const fetchBoxes = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await api.get(`Box`);
      const filterBoxOptions = response.data.filter(
        (box) => box.boxOptions != null && box.boxOptions.some((option) => option.isOnlineSerieBox === false)
      );
      const sortReponse = filterBoxOptions.sort((a, b) => b.boxId - a.boxId);

      setBoxes(sortReponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterBoxes = () => {
    if (!searchInput.trim()) {
      setFilteredBoxes(boxes);
    } else {
      const filtered = boxes.filter((box) =>
        box.boxName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredBoxes(filtered);
    }
  };

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  // Add the clearSearch function
  const clearSearch = () => {
    setSearchInput("");
  };

  const numColumns = 2;

  const ProductCard = ({ item }) => {
    const filterBoxOptions = item.boxOptions.filter(
      (option) => option.isOnlineSerieBox === false
    );
    const lowestPrice = Math.min(
      ...filterBoxOptions.map((option) => option.displayPrice)
    );
    return (
      <TouchableOpacity
        key={item.boxId}
        onPress={() =>
          navigation.navigate("ProductDetailScreen", { boxId: item.boxId })
        }
      >
        <View style={styles.card}>
          <Image
            source={{ uri: item.boxImage[0]?.boxImageUrl }}
            style={styles.image}
          />
          <View style={styles.cardTextSection}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.cardText}
            >
              {item.boxName}
            </Text>
            <Text style={styles.cardText}>
              {lowestPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          value={searchInput}
          onChangeText={handleSearchChange}
        />
        {searchInput.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <FontAwesome name="times" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredBoxes}
        renderItem={ProductCard}
        keyExtractor={(item) => item.boxId.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    paddingLeft: 10,
  },
  list: {
    padding: 10,
  },
  card: {
    elevation: 15,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 10,
    paddingBottom: 10,
    margin: 10,
    width: screenWidth / numColumns - 30,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    truncate: true,
    textAlign: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "black",
  },
  cardTextSection: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
