import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import api from "../../api/api";
// import { selectUser } from "../../../../../Redux/features/counterSlice";


const AddressPOST = ({ setAddAddress }) => {
    const [loading, setLoading] = useState(false);
//   const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    provinceId: null,
    province: null,
    districtId: null,
    district: null,
    wardCode: null,
    ward: null,
    addressDetail: "",
    // userId: user.userId,
    userId: 20,
    note: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
        headers: { 
            Token: "62417330-f6d2-11ef-91ea-021c91d80158",
            "Content-Type": "application/json",
         },
      });
      if (response.data.code === 200) {
        setProvinces(response.data.data);
        setDistricts([]);
        setWards([]);
      }
    } catch (err) {
      console.error("Error fetching provinces:", err);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/district", {
        headers: {
          Token: "62417330-f6d2-11ef-91ea-021c91d80158",
          "Content-Type": "application/json",
        },
      });
      if (response.data.code === 200) {
        setDistricts(response.data.data.filter((d) => d.ProvinceID === provinceId));
      }
    } catch (err) {
      console.error("Error fetching districts:", err);
    }
  };

  const fetchWards = async (districtId) => {
    if (!districtId) return;
    try {
      const response = await axios.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward", {
        params: { district_id: districtId },
        headers: {
          Token: "62417330-f6d2-11ef-91ea-021c91d80158",
          "Content-Type": "application/json",
        },
      });
      if (response.data.code === 200) {
        setWards(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching wards:", err);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateAddress = async () => {
    setLoading(true);
    try {
        console.log("Address added:", formData);
      await api.post("Address", formData);

      Alert.alert("Success", "Address added successfully");
      
      setAddAddress(false);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", "Failed to add address");
      console.error("Error adding address:", error);
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 ,marginTop:20 , textAlign:'center' }}>Add New Address</Text>
        <View style={{ marginBottom: 10, backgroundColor: "white", padding: '5%', borderRadius: 20 }}> 
          <Text style={{ fontSize: 20, marginBottom: 10, fontWeight:'bold' }}>Contact Information</Text>
          {[
            { title: "Full Name" ,key: "name", placeholder: "Enter your name" },
            { title: "Phone Number", key: "phoneNumber", placeholder: "Enter your phone number" },
          ].map(({ key, placeholder, title }) => (
            <View key={key} style={{ marginBottom: 10 , padding: '1%'}}>
              <Text style={{fontSize:16}}>{title}</Text>
              <TextInput
                style={{ borderBottomWidth: 0.5}}
                placeholder={placeholder}
                value={formData[key]}
                onChangeText={(value) => handleChange(key, value)}
              />
            </View>
          ))}
        </View>

        <View style={{ marginBottom: 10, backgroundColor: "white", padding: '5%', borderRadius: 20 }}> 
          <Text style={{ fontSize: 20, marginBottom: 10, fontWeight:'bold' }}>Address Information</Text>
        {[
            { title:"Address Detail", key: "addressDetail", placeholder: "Enter your address detail" },
          ].map(({ key, placeholder, title }) => (
            <View key={key} style={{ marginBottom: 10 , padding: '1%'}}>
              <Text style={{fontSize:16}}>{title}</Text>
              <TextInput
                style={{ borderBottomWidth: 0.5}}
                placeholder={placeholder}
                value={formData[key]}
                onChangeText={(value) => handleChange(key, value)}
              />
            </View>
          ))}
        
        <View  style={{ marginBottom: 10, borderWidth: 1, borderColor: "gray" }}>
          <Picker
            selectedValue={formData.provinceId}
            onValueChange={(value) => {
              const selectedProvince = provinces.find((p) => p.ProvinceID === value);
              setFormData({ ...formData, provinceId: value, province: selectedProvince?.ProvinceName, districtId: null, wardCode: null });
              fetchDistricts(value);
            }}
          >
            <Picker.Item label="Select Province" value={null} />
            {provinces.map((prov) => (
              <Picker.Item key={prov.ProvinceID} label={prov.ProvinceName} value={prov.ProvinceID} />
            ))}
          </Picker>
          </View>

      <View  style={{ marginBottom: 10, borderWidth: 1, borderColor: "gray" }}>
        <Picker
          
            selectedValue={formData.districtId}
            onValueChange={(value) => {
              const selectedDistrict = districts.find((d) => d.DistrictID === value);
              setFormData({ ...formData, districtId: value, district: selectedDistrict?.DistrictName, wardCode: null });
              fetchWards(value);
            }}
            enabled={!!formData.provinceId}
          >
            <Picker.Item label="Select District" value={null} />
            {districts.map((dist) => (
              <Picker.Item key={dist.DistrictID} label={dist.DistrictName} value={dist.DistrictID} />
            ))}
          </Picker>
      </View>
        
      <View  style={{ marginBottom: 10, borderWidth: 1, borderColor: "gray" }}>
        <Picker
          selectedValue={formData.wardCode}
          onValueChange={(value) => {
            const selectedWard = wards.find((w) => w.WardCode === value);
            setFormData({ ...formData, wardCode: value, ward: selectedWard?.WardName });
          }}
          enabled={!!formData.districtId}
        >
          <Picker.Item label="Select Ward" value={null} />
          {wards.map((ward) => (
            <Picker.Item key={ward.WardCode} label={ward.WardName} value={ward.WardCode} />
          ))}
        </Picker>
      </View>
    </View>

        <TouchableOpacity disabled={loading} style={{ backgroundColor: loading ? "gray" : "black", padding: 10, borderRadius: 5 }} onPress={handleUpdateAddress}>
          <Text style={{ color: "white", textAlign: "center" }}>{loading ? "Saving..." : "Save Changes"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
   
  );
};

export default AddressPOST;