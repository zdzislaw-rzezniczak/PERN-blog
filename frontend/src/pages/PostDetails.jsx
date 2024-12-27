import {Link, useLocation, useNavigate} from 'react-router-dom';
import React from "react";

const PostDetails = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook to navigate programmatically
    const { post } = location.state || {}; // Get the post data from state

    if (!post) {
        return <p>No post data found</p>; // Handle missing post data
    }

    const deletePost = async () => {
        try {
            const token = sessionStorage.getItem('authToken'); // Assuming token is stored here
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Pass token for authentication
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete post.');
            }

            alert('Post deleted successfully!');
            navigate('/posts'); // Redirect to posts page
        } catch (error) {
            console.error('Error deleting post:', error);
            alert(error.message || 'An error occurred while deleting the post.');
        }
    };





    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={deletePost}>Delete</button>
            <span>Dodaj komentarz: <Link to={`/create-comment/${post.id}`}>Create Comment</Link></span>
        </div>
    );
};

export default PostDetails;
