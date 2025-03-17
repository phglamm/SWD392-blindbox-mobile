import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../../api/api";

const BlogDetailScreen = () => {
    const route = useRoute();
    const { blogId } = route.params; // Nhận ID từ BlogScreen
    const [blogDetail, setBlogDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                const response = await api.get(`BlogPost/${blogId}`); // Gọi API chi tiết bài viết
                setBlogDetail(response.data);
            } catch (err) {
                setError(err);
                console.error("Error fetching blog detail:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [blogId]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#FFAEB9" />
            ) : error ? (
                <Text style={styles.errorText}>Lỗi tải bài viết.</Text>
            ) : (
                <View style={styles.card}>
                    {/* Tiêu đề bài viết */}
                    <Text style={styles.title}>{blogDetail.blogPostTitle}</Text>

                    {/* Tác giả & ngày đăng */}
                    <Text style={styles.author}>
                        ĐĂNG BỞI <Text style={styles.bold}> {blogDetail.user ? blogDetail.user.username : "Unknown"}</Text> VÀO LÚC {new Date(blogDetail.blogCreatedDate).toLocaleDateString()}
                    </Text>

                    {/* Nội dung bài viết */}
                    <Text style={styles.content}>{blogDetail.blogPostContent}</Text>

                    {/* Ảnh chính */}
                    <Image source={{ uri: blogDetail.blogPostImage }} style={styles.image} />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        padding: 20,
    },
    card: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    author: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        fontStyle: "italic",
        marginBottom: 15,
    },
    bold: {
        fontWeight: "bold",
        color: "#333",
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 15,
    },
    image: {
        width: "100%",
        height: 400,
        borderRadius: 10,
        resizeMode: "cover",
    },
    errorText: {
        color: "red",
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
});

export default BlogDetailScreen;
