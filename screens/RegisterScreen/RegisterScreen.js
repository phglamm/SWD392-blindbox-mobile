import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { TextInput, Button, Text, RadioButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [gender, setGender] = useState("male"); // 'male' or 'female'

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/Logo-removebg.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Create an account</Text>

      {/* Input Username */}
      <TextInput
        label="Username"
        mode="outlined"
        left={<TextInput.Icon icon="account" />}
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
        theme={{ colors: { primary: "rgb(248, 150, 150)", outline: "rgb(248, 150, 150)" } }}
      />

      {/* Input Full Name */}
      <TextInput
        label="Full Name"
        mode="outlined"
        left={<TextInput.Icon icon="account" />}
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        style={styles.input}
        theme={{ colors: { primary: "rgb(248, 150, 150)", outline: "rgb(248, 150, 150)" } }}
      />

      {/* Input Phone */}
      <TextInput
        label="Phone"
        mode="outlined"
        left={<TextInput.Icon icon="phone" />}
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
        keyboardType="phone-pad"
        theme={{ colors: { primary: "rgb(248, 150, 150)", outline: "rgb(248, 150, 150)" } }}
      />

      {/* Input Email */}
      <TextInput
        label="Email"
        mode="outlined"
        left={<TextInput.Icon icon="email" />}
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

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        <Text style={styles.label}>Gender</Text>
        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton value="male" />
              <Text>Male</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="female" />
              <Text>Female</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>

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
      </View>

      {/* Login Link */}
      <Text style={styles.registerText}>
        I Already Have an Account{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ fontWeight: "bold", color: "rgb(248, 150, 150)" }}>Login</Text>
        </TouchableOpacity>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  genderContainer: {
    width: "100%",
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
