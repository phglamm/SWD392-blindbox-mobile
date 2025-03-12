import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios"; // Import axios
import api from "../../api/api";

const BlogScreen = () => {
    const [blogPosts, setBlogPosts] = useState([]); // State lưu bài viết
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    // 🔥 Hàm fetch dữ liệu blog post trực tiếp trong BlogScreen.js
    const fetchBlogPosts = async () => {
        try {
            const response = await api.get("BlogPost");
            setBlogPosts(response.data); // Lưu dữ liệu vào state
        } catch (err) {
            setError(err);
            console.error("Error fetching blog posts:", err);
        } finally {
            setLoading(false);
        }
    };

    // 🟢 Gọi API khi màn hình được load
    useEffect(() => {
        fetchBlogPosts();
    }, []);

    // 🟢 Xử lý khi người dùng bấm vào một bài viết
    const handleCardPress = (id) => {
        console.log(`Card clicked! Blog ID: ${id}`);
        // Điều hướng đến màn hình chi tiết nếu cần
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/banner/blogBanner.png")} style={styles.banner} />
                <Text style={styles.overlayText}>TOY DAYS</Text>
            </View>

            {/* Hiển thị loading nếu dữ liệu chưa tải xong */}
            {loading ? (
                <ActivityIndicator size="large" color="rgb(248, 150, 150)" />
            ) : error ? (
                <Text style={styles.errorText}>Error loading blog posts.</Text>
            ) : (
                <View style={styles.blogList}>
                    {blogPosts.map((post) => (
                        <TouchableOpacity key={post.id} style={styles.card} onPress={() => handleCardPress(post.id)}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: post.blogPostImage }} style={styles.mainImage} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.heading}>{post.blogPostTitle}</Text>
                                <Text style={styles.paragraph}>{post.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center", // Căn giữa tất cả nội dung trong ScrollView
    },
    blogList: {
        width: "100%",
        alignItems: "center", // Căn giữa tất cả các card
    },
    card: {
        width: "80%", // Card chiếm 80% màn hình để nhìn đẹp hơn
        marginBottom: 20,
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: "white",
        alignSelf: "center", // Đảm bảo từng card được căn giữa
    },
    imageContainer: {
        position: "relative",
        width: "100%",
    },
    banner: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    mainImage: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    overlayText: {
        position: "absolute",
        top: "40%",
        left: "30%",
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        textShadowColor: "black",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#f9f9f9",
        textAlign: "center",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
    },
    errorText: {
        color: "red",
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
});

export default BlogScreen;
