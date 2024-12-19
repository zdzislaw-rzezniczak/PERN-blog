import React, {useState} from 'react';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const [message, setMessage] = useState('');

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

        const { title, content} = formData;

        if (!title || !content) {
            setMessage('All fields are required.');
            return;
        }

        setMessage('');

        const postData = {
            title,
            content,
        };

        try {
            const response = await fetch('http://localhost:5001/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                setMessage('Post created successfully!');
                setFormData({ title: '', content: ''});
            } else {
                const errorData = await response.json();
                setMessage(errorData?.message || 'Creation of the post failed.');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while creating the post.');
        }
    };

    return (
        <div>
            <h2>Create a Post</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;