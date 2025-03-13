import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import api from "../../api/api";

export default function ManageOrder({route}) {
    const [selectedStatus, setSelectedStatus] = useState(0);
    const selectedOrderStatus = route.params;
    console.log(selectedOrderStatus);

    useEffect(() => {
        if (selectedOrderStatus) {
            const statusIndex = orderStatus.findIndex(status => status.title === selectedOrderStatus.orderStatus);
            setSelectedStatus(statusIndex !== -1 ? statusIndex : 0);
        }
    }, [selectedOrderStatus]);

    const [orders, setOrders] = useState([]);
    const orderStatus = [
        {title: "All Order"},
        {title: "Pending"},
        {title: "Processing"},
        {title: "Shipping"},
        {title: "Arrived"},
        {title: "Cancelled"},
        {title: "Return Refund"},
    ];

    const formatDate = (dateString) => {
        const options = {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        };
        return new Date(dateString)
          .toLocaleDateString("en-GB", options)
          .replace(",", "");
      };

    const fetchOrders = async () => {
        try {
          const response = await api.get('Order');
          let fetchedOrders = response.data;

          if (selectedStatus !== 0) {
            const statusTitle = orderStatus[selectedStatus].title;
            fetchedOrders = fetchedOrders.filter(order => order.orderStatusDetailsSimple?.slice(-1)[0]?.statusName === statusTitle);
          }
          fetchedOrders.sort((a, b) => new Date(b.orderCreatedAt) - new Date(a.orderCreatedAt));
          setOrders(fetchedOrders);

        } catch (error) {
          console.error(error);
        }
      };
    
    useEffect(() => {
        fetchOrders();
    }, [selectedStatus]);

    return (
        <View style={{}}>
            <View>
                <ScrollView horizontal={true} style={{width:'100%', backgroundColor:'white',height:'9%', borderColor:'black', shadowOffset: { width: -3, height: -1 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}} >
                    {orderStatus.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={{ 
                                width: 100, 
                                flex: 1,
                                justifyContent: 'center',
                                borderBottomWidth: selectedStatus === index ? 2 : 0,
                                borderBottomColor: selectedStatus === index ? 'red' : 'transparent',
                                backgroundColor: selectedStatus === index ? 'black' : 'white',
                                
                            }}
                            onPress={() => setSelectedStatus(index)}
                        >
                            <Text style={{color: selectedStatus === index ? 'red' : 'black',textAlign:'center'}}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
           
            <View style={{flexDirection:'column', justifyContent:'space-between', height:'100%', gap:'2%'}}>
                <ScrollView style={{height: '100%',padding:'5%' ,backgroundColor:'white' }}>
                    {orders.map((order, index) => (
                        <TouchableOpacity key={index} style={{height:300 ,backgroundColor:'white',marginBottom:'8%',flexDirection: 'column', borderRadius:30,shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                            <View style={{width:'100%', height:'25%',boxShadow:'0px 1px 5px gray' ,flexDirection:'row', justifyContent:'space-between', borderTopRightRadius:30, borderTopLeftRadius:30}}>
                                <View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'white', padding:'3%', width:'70%'}}>
                                    <Text>Order ID: {order.orderId}</Text>
                                    <Text>Order Date: {formatDate(order.orderCreatedAt)}</Text>
                                </View>
                                <View style={{width:'30%',height:'100%' ,justifyContent:'center', alignItems:'center'}}>
                                    <Text>
                                        {order.orderStatusDetailsSimple?.slice(-1)[0] ?.statusName || "Pending"}
                                    </Text>
                                </View>
                            </View>

                            <View style={{width:'100%' ,height:'75%', padding:'4%'}}>
                                
                                {order.orderItems.length > 0 && order.orderItems.slice(0, 1).map((item, itemIndex) => (

                                    <View key={itemIndex} style={{width:'100%', height:'100%' ,flexDirection:'column'}} >
                                        <View style={{flexDirection:'row', height:'50%'}}>
                                            <View style={{width:'30%', height:'100%'}}>
                                                <Image
                                                    source={{ uri: item.imageUrl }}
                                                    style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }}
                                                />
                                            </View> 
                                            <View style={{width:'70%', backgroundColor:'white', height:'100%'}}>
                                                <Text style={{fontWeight:'bold', fontSize:20}}> {item.boxName}</Text>
                                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                    <Text style={{color:'gray'}}> Option: {item.boxOptionName}</Text>
                                                    <Text style={{color:'gray'}}> x{item.quantity}</Text>
                                                </View>
                                                
                                            </View>
                                        </View>
                                       

                                        <View style={{ height:'50%', flexDirection:'column', alignItems:'center'}}>
                                            <View style={{width:'100%', height:'50%', flexDirection:'column', justifyContent:'flex-end', paddingTop:'1%'}}>
                                                <Text style={{color:'black',textAlign:'right', fontWeight:'bold', fontSize:15}}> Order Total: {order.totalPrice.toLocaleString() + " đ"}</Text>
                                                <Text style={{color:'black',textAlign:'right', fontSize:15}}>  Payment Method: {order.paymentMethod}{" "}</Text>
                                            </View>
                                            <View style={{width:'100%', height:'50%', flexDirection:'row', justifyContent:'flex-end', gap:'2%', paddingTop:'3%'}}>
                                                {order.orderStatusDetailsSimple?.slice(-1)[0]?.statusName === "Arrived" ? (
                                                    <>
                                                        <TouchableOpacity style={{width:'20%', height:'100%', backgroundColor:'black', justifyContent:'center', alignItems:'center', borderRadius:10}}>
                                                            <Text style={{color:'white', fontWeight:'bold'}}>Rate</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{width:'60%', height:'100%', backgroundColor:'red', justifyContent:'center', alignItems:'center', borderRadius:10}}>
                                                            <Text style={{color:'white', fontWeight:'bold'}}>Request to Return/Refund</Text>
                                                        </TouchableOpacity>
                                                    </>
                                                ) : order.orderStatusDetailsSimple?.slice(-1)[0]?.statusName === "Pending" ? (
                                                    <TouchableOpacity style={{boxShadow:'0px 1px 4px black',backgroundColor:'red',width:'40%', height:'100%', justifyContent:'center', borderRadius:5}}>
                                                        <Text style={{color:'white',textAlign:'center', fontWeight:'bold'}}>Cancel Order</Text>
                                                    </TouchableOpacity>
                                                ) : null}
                                            </View>
                                        </View>

                                    </View>

                                ))}
                            </View>
                            
                            
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            
        </View>
    );
}