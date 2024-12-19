import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import PostItem from "../components/PostItem.jsx";

const AuthorPosts = () => {
    const { authorId } = useParams(); // Extract the authorId from the URL
    const [authorPosts, setAuthorPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthorPosts = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}users/posts/${authorId}`) .then((response) => response.json())
            .then((data) => {
                setAuthorPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getAuthorPosts();
    }, [authorId]);
    return (
        <div>
            <h2>Posts by Author {authorId}</h2>
            {loading ? <p>Loading posts...</p> : authorPosts.map((post) => <PostItem key={post.id} post={post}/>)}
        </div>
    );
};

export default AuthorPosts;