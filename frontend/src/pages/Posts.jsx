import React, {useEffect, useState} from 'react';
import PostItem from "../components/PostItem.jsx";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}posts`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
    };



    useEffect(() => {
        getPosts();
    }, [])


    return (
        <div>
            {loading ? <p>Loading posts...</p> : posts.map((post) => <PostItem key={post.id} post={post} />)}
        </div>
    );

};

export default Posts;