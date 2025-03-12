import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import api from "../../api/api";

const AddressPUT = ({ setUpdateAddress, selectedAddress }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        addressId: selectedAddress.addressId || 0,
        province: selectedAddress.province || "",
        district: selectedAddress.district || "",
        ward: selectedAddress.ward || "",
        addressDetail: selectedAddress.addressDetail || "",
        phoneNumber: selectedAddress.phoneNumber || "",
        name: selectedAddress.name || ""
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        fetchProvinces();
        if (formData.provinceId) fetchDistricts(formData.provinceId);
        if (formData.districtId) fetchWards(formData.districtId);
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
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "provinceId" ? { districtId: null, wardCode: null } : {}),
            ...(name === "districtId" ? { wardCode: null } : {}),
        }));

        if (name === "provinceId") fetchDistricts(value);
        if (name === "districtId") fetchWards(value);
    };

    const handleUpdateAddress = async () => {
        setLoading(true);
        console.log(formData);
        try {
            await api.put(`Address`, formData);
            Alert.alert("Success", "Address updated successfully");
            setUpdateAddress(false);
        } catch (error) {
            Alert.alert("Error", "Failed to update address");
            console.error("Error updating address:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>Update Address</Text>

                {/* Contact Information */}
                <View style={{ marginBottom: 10, backgroundColor: "white", padding: '5%', borderRadius: 20 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>Contact Information</Text>
                    {[{ title: "Full Name", key: "name", placeholder: "Enter your name" },
                    { title: "Phone Number", key: "phoneNumber", placeholder: "Enter your phone number" }]
                    .map(({ key, placeholder, title }) => (
                        <View key={key} style={{ marginBottom: 10, padding: '1%' }}>
                            <Text style={{ fontSize: 16 }}>{title}</Text>
                            <TextInput
                                style={{ borderBottomWidth: 0.5 }}
                                placeholder={placeholder}
                                value={formData[key]}
                                onChangeText={(value) => handleChange(key, value)}
                            />
                        </View>
                    ))}
                </View>

                {/* Address Information */}
                <View style={{ marginBottom: 10, backgroundColor: "white", padding: '5%', borderRadius: 20 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: 'bold' }}>Address Information</Text>

                    <Text style={{ fontSize: 16 }}>Address Detail</Text>
                    <TextInput
                        style={{ borderBottomWidth: 0.5, marginBottom: 10 }}
                        placeholder="Enter detailed address"
                        value={formData.addressDetail}
                        onChangeText={(value) => handleChange("addressDetail", value)}
                    />

                    <Text style={{ fontSize: 16, marginBottom:5 }}>Province</Text>
                <View  style={{ marginBottom: 10, borderWidth: 1, borderColor: "gray" }}>
                <Picker selectedValue={formData.provinceId} onValueChange={(value) => handleChange("provinceId", value)}>
                        <Picker.Item label="Select Province" value={null} />
                        {provinces.map((prov) => (<Picker.Item key={prov.ProvinceID} label={prov.ProvinceName} value={prov.ProvinceID} />))}
                    </Picker>
                </View>
                    

                    <Text style={{ fontSize: 16, marginBottom:5 }}>District</Text>
                <View  style={{ marginBottom: 10, borderWidth: 1, borderColor: "gray" }}>
                    <Picker selectedValue={formData.districtId} onValueChange={(value) => handleChange("districtId", value)}>
                        <Picker.Item label="Select District" value={null} />
                        {districts.map((dist) => (<Picker.Item key={dist.DistrictID} label={dist.DistrictName} value={dist.DistrictID} />))}
                    </Picker>
                </View>

                    <Text style={{ fontSize: 16, marginBottom:5 }}>Ward</Text>
                <View  style={{ marginBottom: 10, borderWidth: 1, borderColor: "gray" }}>
                <Picker
                    selectedValue={formData.ward}  // Make sure this matches the key in formData
                    onValueChange={(value) => handleChange("ward", value)}
                    enabled={!!formData.districtId}>
                    <Picker.Item label="Select Ward" value={null} />
                    {wards.map((ward) => (
                        <Picker.Item key={ward.WardCode} label={ward.WardName} value={ward.WardCode} />
                    ))}
                </Picker>
                </View>
                    
                </View>

                <TouchableOpacity 
                    disabled={loading} 
                    style={{ backgroundColor: loading ? "gray" : "black", padding: 10, borderRadius: 5 }} 
                    onPress={handleUpdateAddress}>
                    <Text style={{ color: "white", textAlign: "center" }}>{loading ? "Updating..." : "Update Address"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        
    );
};

export default AddressPUT;
