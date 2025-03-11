import { View, Text, Image } from "react-native";
import React from "react";
import banner from "../../assets/SkullPanda.png";
import ProductScreen from "../ProductScreen/ProductScreen";
export default function HomeScreen() {
  return (
    <View style={{ flex: 1, flexDirection:'column', justifyContent:'space-between', alignItems: "center" }}>
      <View style={{width:'100%', height: "25%", backgroundColor: "black"}}>
        <Image source={banner} style={{width: "100%", height: "100%"}} />
      </View>

      <View style={{width:'100%', height: "74%", backgroundColor: "white"}}>
        <ProductScreen/>
      </View>
      
    </View>
  );
}
