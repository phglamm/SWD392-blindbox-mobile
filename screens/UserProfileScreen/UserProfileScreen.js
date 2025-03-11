import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";
import { Picker } from "@react-native-picker/picker";


export default function UserProfileScreen({ route }) {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { email } = route.params;
  const navigation = useNavigation();

  const userProfileInfo = [
    { title: "UserName", value: userData.username, key: 'username' },
    { title: "Email", value: userData.email, key: 'email' },
    { title: "Phone", value: userData.phone, key: 'phone' },
    { title: "FullName", value: userData.fullname, key: 'fullname' },
    { title: "Gender", value: userData.gender, key: 'gender' },
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
        const response = await api.put('User/update-profile', userData);
        if (response.status === 200) {
          console.log("Profile updated:", userData);
        } else {
          console.error("Failed to update profile:", response.data);
        }
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
    <View style={{ flex: 1, gap: '3%', alignItems: "center", padding: '3%' }}>
      <View style={{
        height: "20%", backgroundColor: "black", flexDirection: 'row',
        justifyContent: 'space-between', borderWidth: 1, borderColor: "black", width: "100%",
        shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 8
      }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: '65%', height: '100%', padding: '5%' }}>
          <View>
            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 30 }}>{userData.fullname}</Text>
            <Text style={{ color: 'white', fontSize: 18 }}>{userData.phone}</Text>
          </View>
          <View>
            <Text style={{ color: 'black', padding: '1%', textAlign: 'center', borderRadius: 15, backgroundColor: 'gray', fontSize: 15 }}>Mystery Minis Member</Text>
          </View>
        </View>
        <View style={{ width: '35%', height: '100%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black', fontWeight: 'bold', backgroundColor: 'red' }}>Avatar</Text>
        </View>
      </View>

      <View style={{
        height: "60%", width: "100%", backgroundColor: "white", justifyContent: 'center',
        shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 8, padding: '5%'
      }}>
        {userProfileInfo.map((info, index) => (
          <View key={index} style={{ flex:1, flexDirection: 'row',borderBottomWidth:1 ,justifyContent: 'space-between', marginBottom: 10, width:'100%' }}>
            <View style={{  width:'25%', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>{info.title}:</Text>
            </View>
            <View style={{ flex: 1,width:'75%', justifyContent: 'center' }}>
              {isEditing ? (
                info.key === 'gender' ? (
                  <Picker
                    selectedValue={info.value === true ? "true" : "false"}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue) => handleInputChange(info.key, itemValue === "true")}
                  >
                    <Picker.Item label="Male" value="true" />
                    <Picker.Item label="Female" value="false" />
                  </Picker>
                ) : (
                  <TextInput
                    style={{ borderBottomWidth: 1,  marginLeft: 10 }}
                    value={info.value}
                    onChangeText={(text) => handleInputChange(info.key, text)}
                  />
                )
              ) : (
                <View style={{  }}>
                  <Text style={{textAlign:'right'}}>
                    {info.key === 'gender' ? (info.value === true ? "Male" : "Female") : info.value}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: "10%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
        <Button color="black" title={isEditing ? "Save Profile" : "Update Profile"} onPress={handleUpdateProfile} />
      </View>
    </View>
  );
}