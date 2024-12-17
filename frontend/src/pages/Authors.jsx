import React, { useEffect, useState } from 'react';

const Authors = () => {
    const [authors, setAuthors] = useState([]); // State for authors
    const [loading, setLoading] = useState(true); // State for loading indicator

    const getAuthors = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL}users`) // Fetch authors from API
            .then((response) => response.json())
            .then((data) => {
                setAuthors(data); // Set authors to state
                setLoading(false); // End loading state
            })
            .catch((error) => {
                console.error("Error fetching authors:", error);
                setLoading(false);
            });
    };

    // Fetch authors when the component mounts
    useEffect(() => {
        getAuthors();
    }, []); // Run only once on component mount

    return (
        <div>
            {loading ? ( // Conditional rendering for loading state
                <p>Loading authors...</p>
            ) : (
                <div>
                    {authors.map((author) => (
                        <div key={author.id}> {/* Add a unique key */}
                            <p>First Name: {author.firstName}</p>
                            <p>Email: {author.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Authors;
