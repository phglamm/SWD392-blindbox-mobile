import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import AddressPOST from "./AddressPOST";

export default function AddressBook() {
    const [addresses, setAddresses] = useState([]);
    const [addNewAddress, setAddNewAddress] = useState(false);

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
      }, [addNewAddress]);

  return (
    addNewAddress ? 
        (
            <AddressPOST setAddAddress={setAddNewAddress} />
        ) 
        : 
        (
            <View style={{ flex: 1, flexDirection:'column', alignItems: "center" }}>
            <ScrollView style={{width:'100%', height: "100%", backgroundColor: "white"}}>
                {addresses.map((address, index) => (
                <TouchableOpacity key={index} style={{width:'100%', height: 100, backgroundColor: "white", padding:'3%', borderBottomWidth:1, borderColor:'gray'}} >
                <View style={{ flexDirection: 'column', width: '100%', height:'100%', justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row', width: '100%' ,justifyContent:'flex-start'}}>
                        <Text style={{paddingRight:'3%' ,textAlign:'center' ,color: 'black', fontWeight: 'bold', fontSize: 18, borderRightWidth: 1 }}>{address.name}</Text>
                        <Text style={{ paddingLeft:'3%',textAlign:'center' ,color: 'gray', fontSize: 18 }}> {address.phoneNumber}</Text>
                    </View>
                    <Text  style={{ color: 'gray', fontSize: 14 }}> {address.addressDetail}</Text>
                    <Text  style={{ color: 'gray', fontSize: 14 }}>{address.ward}, {address.district},{" "} {address.province}</Text>
                </View>
            </TouchableOpacity>       
            ))}
            <View style={{flexDirection:'row', justifyContent:'center', padding:'3%'}}>
                <TouchableOpacity onPress={() => setAddNewAddress(true)} style={{padding:'1%', borderRadius:50 ,width:'40%', height: 70, backgroundColor: "black", justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'white', fontSize: 14   }}>Add New Address</Text>
                </TouchableOpacity>
            </View>
            
            </ScrollView>
          
        </View>  
        )

   
  );
}
