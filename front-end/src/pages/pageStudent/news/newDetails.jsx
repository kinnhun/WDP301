import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NewsDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/news/view/${id}`,
                    {  headers: {
                        'Cache-Control': 'no-cache'
                    }}
                );
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!article) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h4>{article.post_type}</h4>
            <p>
    <small className="text-muted">
        {new Date(article.created_at).toLocaleDateString("en-GB")}
    </small>
</p>
            <h1>{article.title}</h1>
            
            <p>{article.content}</p>
          
        </div>
    );
};

export default NewsDetail;
