import { useNavigation } from "@react-navigation/native";
import { TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const SearchInput = () => {
  const navigation = useNavigation();
  return (
    <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
      <TextInput
        placeholder="Search"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          width: "80%",
        }}
      />
      <View
        style={{
          width: "20%",
          paddingRight: "2%",
          justifyContent: "center",
          flexDirection: "row",
          marginLeft: 10,
        }}
      >
        <Icon
          name="shoppingcart"
          size={30}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("Cart", { screen: "CartScreen" })}
        />
        <Icon name="message1" size={30} />
      </View>
    </View>
  );
};
export default SearchInput;
