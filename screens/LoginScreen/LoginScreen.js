import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo-removebg.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Welcome Back!</Text>

      {/* Input Email */}
      <TextInput
        label="Username or Email"
        mode="outlined"
        left={<TextInput.Icon icon="account" />}
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        theme={{ colors: { primary: "rgb(248, 150, 150)", outline: "rgb(248, 150, 150)" } }}
      />

      {/* Input Password */}
      <TextInput
        label="Password"
        mode="outlined"
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon={secureText ? "eye-off" : "eye"} onPress={() => setSecureText(!secureText)} />}
        secureTextEntry={secureText}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        theme={{ colors: { primary: "rgb(248, 150, 150)", outline: "rgb(248, 150, 150)" } }}
      />

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Button mode="contained" onPress={() => console.log("Login pressed")} style={styles.button}>
        Login
      </Button>

      {/* OR Continue with */}
      <Text style={styles.orText}>- OR Continue with -</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.registerText}>
        Create An Account {" "}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ fontWeight: "bold", color: "rgb(248, 150, 150)" }}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  logo: {
    width: "80%",
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "rgb(248, 150, 150)",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgb(248, 150, 150)",
  },
  orText: {
    marginTop: 20,
    marginBottom: 10,
    color: "#666",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialIcon: {
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 50,
    elevation: 3,
  },
  registerText: {
    color: "#666",
    marginTop: 10,
  },
});
