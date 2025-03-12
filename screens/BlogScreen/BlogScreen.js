import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import banner from '../../assets/banner/blogBanner.png'

const BlogScreen = () => {

  const handleCardPress = () => {
    console.log('Card clicked!');
    // You can navigate or perform other actions here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={banner} // replace with actual image URL
            style={styles.banner}
          />
          <Text style={styles.overlayText}>TOY DAYS</Text>
        </View>
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://example.com/funsm-image.jpg' }} // replace with actual image URL
            style={styles.mainImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>HỔ MẬP TRỞ LẠI, LỢI HẠI HƠN XƯA!!!</Text>
          <Text style={styles.paragraph}>
            Chú Hổ Mập nổi tiếng đã trở lại với diện mạo hoàn toàn mới. Lần này, chú khoác lên mình bộ trang phục của Thần Tài, hóa thân thành "Sứ Giả May Mắn" để ...
          </Text>
        </View>
      </TouchableOpacity>


      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://example.com/funsm-image.jpg' }} // replace with actual image URL
            style={styles.mainImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>HỔ MẬP TRỞ LẠI, LỢI HẠI HƠN XƯA!!!</Text>
          <Text style={styles.paragraph}>
            Chú Hổ Mập nổi tiếng đã trở lại với diện mạo hoàn toàn mới. Lần này, chú khoác lên mình bộ trang phục của Thần Tài, hóa thân thành "Sứ Giả May Mắn" để ...
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5, 
    backgroundColor: "white"
  },
  imageContainer: {
    position: 'relative',
    width: "100%",
    height: undefined, // to maintain aspect ratio
  },
  banner: {
    width: '100%',
    height: 250, // You can adjust the height to your preference
    resizeMode: 'cover', // Ensure the image stretches while maintaining aspect ratio
  },
  mainImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  overlayText: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default BlogScreen;
