import { useLocation } from 'react-router-dom';

const PostDetails = () => {
    const location = useLocation();
    const { post } = location.state || {}; // Odbieramy dane ze state
    console.log(post);
    if (!post) {
        return <p>No post data found</p>; // Obsługa braku danych
    }


    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
};

export default PostDetails;