import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Navigator from "./navigation/Navigator";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CartProvider>
          <FavoritesProvider>
            <Navigator />
          </FavoritesProvider>
        </CartProvider>
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
