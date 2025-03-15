import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import banner2 from '../../assets/BoxItemBanner/banner2.png';
import banner3 from '../../assets/BoxItemBanner/banner3.png';
import banner4 from '../../assets/BoxItemBanner/banner4.png';
import api from '../../api/api';

const BoxItemScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(10); // Số sản phẩm mỗi trang
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (loading) return; // Đảm bảo không tải lại khi đang tải
      setLoading(true);
      try {
        const response = await api.get('BoxItem');  
        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Lần đầu tiên chỉ tải sản phẩm

  // Lọc các sản phẩm theo search query
  const filteredProducts = products.filter((product) =>
    product.boxItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Chia dữ liệu theo trang
  const currentPageData = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const renderProductCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.cardImage} />
      <Text style={styles.productName}>{item.boxItemName}</Text>
      <Text style={styles.productColor}>Color: {item.boxItemColor}</Text>
      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <FontAwesome
            key={index}
            name={index < item.averageRating ? 'star' : 'star-o'}
            size={20}
            color="gold"
          />
        ))}
      </View>
    </View>
  );

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Banner */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bannerContentContainer} // Áp dụng layout tại contentContainerStyle
      >
        <Image source={banner2} style={styles.bannerImage} />
        <Image source={banner3} style={styles.bannerImage} />
        <Image source={banner4} style={styles.bannerImage} />
      </ScrollView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <FontAwesome name="times" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={currentPageData} // Chỉ hiển thị sản phẩm của trang hiện tại
        renderItem={renderProductCard}
        keyExtractor={(item) => `${item.boxItemId}-${item.boxItemName}`}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
      />

      {/* Scrollable Pagination */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={handlePreviousPage}
          style={[styles.paginationButton, page === 1 && styles.disabledButton]}
          disabled={page === 1}
        >
          <Text style={styles.paginationText}>Previous</Text>
        </TouchableOpacity>

        {/* Hiển thị số trang */}
        <Text style={styles.pageInfo}>
          Page {page} of {totalPages}
        </Text>

        <TouchableOpacity
          onPress={handleNextPage}
          style={[styles.paginationButton, page === totalPages && styles.disabledButton]}
          disabled={page === totalPages}
        >
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 10,
  },
  bannerContentContainer: {
    alignItems: 'center', // Áp dụng căn giữa cho phần contentContainerStyle
    justifyContent: 'center',
  },
  bannerImage: {
    width: "400", 
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginHorizontal: 2, // Khoảng cách giữa các banner
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10, 
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    paddingLeft: 10, 
  },
  productsContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5, 
  },
  cardImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productColor: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Canh giữa phân trang
    paddingVertical: 20,
    alignItems: 'center',
    height: 60, // Tăng chiều cao để tránh mất chữ
  },
  paginationButton: {
    backgroundColor: '#FFC1C1', // Màu nút
    paddingVertical: 12, // Tăng chiều cao của nút
    paddingHorizontal: 20, // Tăng chiều rộng của nút
    borderRadius: 5,
    height: 45, // Tăng chiều cao của nút
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  paginationText: {
    color: '#fff',
    fontSize: 16, // Giảm kích thước font chữ
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
  },
});

export default BoxItemScreen;
