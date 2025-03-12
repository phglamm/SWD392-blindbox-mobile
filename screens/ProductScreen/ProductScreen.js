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

export default function ProductScreen() {
  const navigation = useNavigation();
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBoxes();
  }, []);

  const fetchBoxes = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await api.get(`Box`);
      const sortReponse = response.data.sort((a, b) => b.boxId - a.boxId);
      setBoxes(sortReponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const numColumns = 2;

  const ProductCard = ({ item }) => {
    const lowestPrice = Math.min(
      ...item.boxOptions.map((option) => option.displayPrice)
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
            <Text style={styles.cardText}>{item.boxName}</Text>
            <Text style={styles.cardText}>
              Price: {""}
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
      {/* <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Tìm kiếm" />
      </View> */}

      <FlatList
        data={boxes}
        renderItem={ProductCard}
        keyExtractor={(item) => item.boxId}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    width: 350,
    height: 40,
    paddingHorizontal: 20,
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
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
    fontSize: 13,
    fontWeight: "bold",
  },
  cardTextSection: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
