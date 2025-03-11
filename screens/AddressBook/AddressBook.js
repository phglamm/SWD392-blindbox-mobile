import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function AddressBook() {
    const [addresses, setAddresses] = useState([]);

    const fetchAddress = async () => {
        try {
        //   const response = await api.get(`/Address/?userId=${user.userId}`);
        const response = await api.get(`Address/?userId=20`);
          const fetchedAddresses = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setAddresses(fetchedAddresses);
        } catch (err) {
          console.log(err.message);
        }
      };
    
      useEffect(() => {
          fetchAddress();
      }, []);
console.log(addresses);
  return (
    <View style={{ flex: 1, flexDirection:'column', justifyContent:'space-between', alignItems: "center", padding: '4%' }}>
     <TouchableOpacity style={{width:'100%', height: "15%", backgroundColor: "white", padding:'3%'}} >
        <View style={{ flexDirection: 'column', width: '100%', height:'100%', justifyContent:'space-between'}}>
            <View style={{ flexDirection: 'row', width: '100%' ,justifyContent:'flex-start', gap:'3%'}}>
                <Text style={{width:'40%', color: 'black', fontWeight: 'bold', fontSize: 18, borderRightWidth: 1 }}>Luong The Minh</Text>
                <Text style={{ color: 'gray', fontSize: 18 }}>0703308389</Text>
            </View>
            <Text  style={{ color: 'gray', fontSize: 14 }}>505 Tan Ky Tan Quy</Text>
            <Text  style={{ color: 'gray', fontSize: 14 }}>Phuong Tan Quy Quan Tan Phu Thanh Pho Thu Duc </Text>
        </View>
     </TouchableOpacity>
      
      
    </View>
  );
}
