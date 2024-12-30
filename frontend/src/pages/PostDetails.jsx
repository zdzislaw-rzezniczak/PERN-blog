import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

const PostDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { post } = location.state || {};
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState({});
    if (!post) {
        return <p>No post data found</p>;
    }

    const deletePost = async () => {
        try {
            const token = sessionStorage.getItem('authToken');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete post.');
            }

            alert('Post deleted successfully!');
            navigate('/posts');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert(error.message || 'An error occurred while deleting the post.');
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}comments/post/${post.id}/`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAuthorById = async (authorId) => {
        if (authors[authorId]) {
            return; // Author already fetched
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}users/${authorId}/`);
            if (!response.ok) {
                throw new Error(`Failed to fetch author: ${response.status}`);
            }
            const author = await response.json();
            console.log(`Fetched author ${authorId}:`, author);
            setAuthors((prevAuthors) => ({ ...prevAuthors, [authorId]: author }));
        } catch (error) {
            console.error("Error fetching author:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {

        const uniqueAuthorIds = [...new Set(comments.map(comment => comment.author))];
        uniqueAuthorIds.forEach(fetchAuthorById);

    }, [comments]);

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={deletePost}>Delete</button>
            <span>Dodaj komentarz: <Link to={`/create-comment/${post.id}`}>Create Comment</Link></span>

            <h3>Comments</h3>
            {loading ? (
                <p>Loading comments...</p>
            ) : comments.length > 0 ? (
                comments.map(comment => (
                    <div className="comments" key={comment.id}>
                        <p>{comment.content}</p>
                        <h4>Author</h4>
                        <p>
                            {authors[comment.author]
                                ? `${authors[comment.author][0].firstName}`
                                : "Loading author..."}
                        </p>
                    </div>
                ))
            ) : (
                <p>No comments found.</p>
            )}
        </div>
    );
};

export default PostDetails;
