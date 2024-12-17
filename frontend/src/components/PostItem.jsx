import React, { useEffect, useState } from 'react';

const PostItem = ({ post }) => {
    const [author, setAuthor] = useState(null); // Null indicates no data yet
    const [dateString, setDateString] = useState(""); // Null indicates no data yet
    const [loading, setLoading] = useState(true);

    const getAuthorById = (id) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAuthor(data); // Assuming API returns a single object
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching author:", error);
                setLoading(false);
            });
    };

    const changeDate = (dateString) => {
        const dateObject = new Date(Date.parse(dateString))
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            fractionalSecondDigits: 1,
            timeZone: "UTC"
        };

        const formatter = new Intl.DateTimeFormat("pl", options);
        const formattedString = formatter.format(dateObject);
        setDateString(formattedString.substring(0, formattedString.length -5));

    }

    useEffect(() => {
        if (post.authorid) {
            getAuthorById(post.authorid);
        }

    }, [post.authorid]); // Add authorid to the dependency array


    useEffect(() => {
       changeDate(post.createdat);

    }, [post.date]);
    return (
        <div className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>
                Author: {loading ? 'Loading...' : author ? author[0].firstName : 'Unknown'}
            </p>
            <p>{dateString}</p>
        </div>
    );
};

export default PostItem;
