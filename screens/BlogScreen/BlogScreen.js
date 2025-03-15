import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import axios from "axios";
import api from "../../api/api";
import { useNavigation } from "@react-navigation/native";


const BlogScreen = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;


    const fetchBlogPosts = async () => {
        try {
            const response = await api.get("BlogPost");
            setBlogPosts(response.data);
        } catch (err) {
            setError(err);
            console.error("Error fetching blog posts:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBlogPosts();
    }, []);
    const navigation = useNavigation();


    const handleCardPress = (blogPostId) => {
        console.log(blogPostId)
        navigation.navigate("BlogDetail", { blogId: blogPostId });
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/banner/blogBanner.png")} style={styles.banner} />
                <Text style={styles.overlayText}>TOY DAYS</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="rgb(248, 150, 150)" />
            ) : error ? (
                <Text style={styles.errorText}>Error loading blog posts.</Text>
            ) : (
                <>
                    <View style={styles.blogList}>
                        {currentPosts.map((post) => (
                            <TouchableOpacity key={post.blogPostId} style={styles.card} onPress={() => handleCardPress(post.blogPostId)}>
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

                    <View style={styles.pagination}>
                        <Button
                            title="Previous"
                            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            color="#FFAEB9"
                        />
                        <Text style={styles.pageNumber}>Page {currentPage}</Text>
                        <Button
                            title="Next"
                            onPress={() => setCurrentPage((prev) => prev + 1)}
                            disabled={indexOfLastPost >= blogPosts.length}
                            color="#FFAEB9"
                        />
                    </View>

                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    blogList: {
        width: "100%",
        alignItems: "center",
    },
    card: {
        width: "80%",
        marginBottom: 20,
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: "white",
        alignSelf: "center",
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
    pagination: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        gap: 10,
    },
    pageNumber: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
});

export default BlogScreen;
