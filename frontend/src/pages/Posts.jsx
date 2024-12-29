import React, {useEffect, useState} from 'react';
import PostItem from "../components/PostItem.jsx";
import {Link} from "react-router-dom";

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
            {loading ? <p>Loading posts...</p> : posts.map((post) => <PostItem key={post.id} post={post}/>)}
            <div>
                <span>Dodawaj kolejne posty: <Link to="/create-post">Add Post</Link></span>
            </div>

        </div>
    );

};

export default Posts;