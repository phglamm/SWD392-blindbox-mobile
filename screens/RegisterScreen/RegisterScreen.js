import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo-removebg.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Create an account</Text>

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

      {/* Confirm Password */}
      <TextInput
        label="Confirm Password"
        mode="outlined"
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon={secureText ? "eye-off" : "eye"} onPress={() => setSecureText(!secureText)} />}
        secureTextEntry={secureText}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.input}
        theme={{ colors: { primary: "rgb(248, 150, 150)", outline: "rgb(248, 150, 150)" } }}
      />

      {/* Register Button */}
      <Button mode="contained" onPress={() => console.log("Register pressed")} style={styles.button}>
        Create Account
      </Button>

      {/* OR Continue with */}
      <Text style={styles.orText}>- OR Continue with -</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="apple" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="facebook" size={24} color="#3b5998" />
        </TouchableOpacity> */}
      </View>

      {/* Login Link */}
      <Text style={styles.registerText}>
        I Already Have an Account {" "}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}> 
          <Text style={{ fontWeight: "bold", color: "rgb(248, 150, 150)" }}>Login</Text>
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
