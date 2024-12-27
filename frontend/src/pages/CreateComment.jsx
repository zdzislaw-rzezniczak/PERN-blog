import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateComment = () => {
    const { post_id } = useParams(); // Extract the dynamic parameter
    const [formData, setFormData] = useState({ content: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            setMessage('No token found. Please log in.');
            return;
        }

        if (!formData.content.trim()) {
            setMessage('Content is required.');
            return;
        }

        setMessage('');
        setLoading(true);

        const commentData = {
            post_id: parseInt(post_id, 10), // Ensure post_id is an integer
            content: formData.content,
        };

        try {
            const response = await fetch('http://localhost:5001/api/comments/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create comment.');
            }

            setMessage('Comment created successfully!');
            setFormData({ content: '' }); // Reset the form
        } catch (error) {
            console.error('Error creating comment:', error);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create a Comment</h2>
            {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your comment..."
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Create Comment'}
                </button>
            </form>
        </div>
    );
};

export default CreateComment;
