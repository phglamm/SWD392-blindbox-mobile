import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function UserProfileScreen({ route }) {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { email } = route.params;
  const navigation = useNavigation();

  const userProfileInfo = [
    { title: "UserName", value: userData.username, key: "username" },
    { title: "Email", value: userData.email, key: "email" },
    { title: "Phone", value: userData.phone, key: "phone" },
    { title: "FullName", value: userData.fullname, key: "fullname" },
    { title: "Gender", value: userData.gender, key: "gender" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`User/user-by-email/${email}`);
      const userData = response.data || {};
      setUserData(userData);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    navigation.navigate("LoginScreen");
  };

  const handleUpdateProfile = async () => {
    if (isEditing) {
      try {
        const response = await api.put("User/update-profile", userData);
        if (response.status === 200) {
          console.log("Profile updated:", userData);
        } else {
          console.error("Failed to update profile:", response.data);
        }
        Toast.show({
          type: "success",
          text1: "Profile updated successfully",
          visibilityTime: 2000,
        });
      } catch (error) {
        console.log("Failed to update profile:", userData);
        console.error("API Error:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View>
            <Text style={styles.fullname}>{userData.fullname}</Text>
            <Text style={styles.phone}>{userData.phone}</Text>
          </View>
          <View>
            <Text style={styles.memberStatus}>Mystery Minis Member</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.avatarText}>Avatar</Text>
        </View>
      </View>

      <View style={styles.profileInfo}>
        {userProfileInfo.map((info, index) => (
          <View key={index} style={styles.profileInfoRow}>
            <View style={styles.profileInfoTitle}>
              <Text style={styles.profileInfoTitleText}>{info.title}:</Text>
            </View>
            <View style={styles.profileInfoValue}>
              {isEditing ? (
                info.key === "gender" ? (
                  <Picker
                    selectedValue={info.value === true ? "true" : "false"}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      handleInputChange(info.key, itemValue === "true")
                    }
                  >
                    <Picker.Item label="Male" value="true" />
                    <Picker.Item label="Female" value="false" />
                  </Picker>
                ) : (
                  <TextInput
                    style={styles.textInput}
                    value={info.value}
                    onChangeText={(text) => handleInputChange(info.key, text)}
                  />
                )
              ) : (
                <View>
                  <Text style={styles.profileInfoText}>
                    {info.key === "gender"
                      ? info.value === true
                        ? "Male"
                        : "Female"
                      : info.value}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          color="black"
          title={isEditing ? "Save Profile" : "Update Profile"}
          onPress={handleUpdateProfile}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: "3%",
    alignItems: "center",
    padding: "3%",
  },
  header: {
    height: "20%",
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "65%",
    height: "100%",
    padding: "5%",
  },
  fullname: {
    color: "red",
    fontWeight: "bold",
    fontSize: 30,
  },
  phone: {
    color: "white",
    fontSize: 18,
  },
  memberStatus: {
    color: "black",
    padding: "1%",
    textAlign: "center",
    borderRadius: 15,
    backgroundColor: "gray",
    fontSize: 15,
  },
  headerRight: {
    width: "35%",
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "black",
    fontWeight: "bold",
    backgroundColor: "red",
  },
  profileInfo: {
    height: "60%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    padding: "5%",
  },
  profileInfoRow: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  profileInfoTitle: {
    width: "25%",
    justifyContent: "center",
  },
  profileInfoTitleText: {
    fontWeight: "bold",
  },
  profileInfoValue: {
    flex: 1,
    width: "75%",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: 150,
  },
  textInput: {
    borderBottomWidth: 1,
    marginLeft: 10,
  },
  profileInfoText: {
    textAlign: "right",
  },
  buttonContainer: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});