import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link
import axios from "axios"; // Import axios or use fetch

const News = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

  
    const fetchNewsArticles = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/news`, {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            setNewsArticles(response.data);
        } catch (error) {
            console.error('Error fetching news articles:', error);
        }
    };

    useEffect(() => {
        fetchNewsArticles(); // Call the fetch function on component mount
    }, []);

    // Calculate the number of pages
    const totalPages = Math.ceil(newsArticles.length / itemsPerPage);
    const indexOfLastArticle = currentPage * itemsPerPage;
    const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
    const currentArticles = newsArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Change page function
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handlers for next and previous buttons
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPagination = () => {
        const paginationItems = [];

        // Previous Button
        paginationItems.push(
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} key="prev">
                <button className="page-link" onClick={handlePrevious}>&laquo; Previous</button>
            </li>
        );

        let startPage, endPage;
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage === 1) {
                startPage = 1;
                endPage = 3;
            } else if (currentPage === totalPages) {
                startPage = totalPages - 2;
                endPage = totalPages;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }

        // Add page numbers and ellipses
        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
                    <button className="page-link" onClick={() => paginate(i)}>{i}</button>
                </li>
            );
        }

        // Ellipses before the first page
        if (startPage > 1) {
            paginationItems.unshift(
                <li className="page-item" key="left-ellipsis">
                    <span className="page-link">...</span>
                </li>
            );
        }

        // Ellipses after the last page
        if (endPage < totalPages) {
            paginationItems.push(
                <li className="page-item" key="right-ellipsis">
                    <span className="page-link">...</span>
                </li>
            );
        }

        // Next Button
        paginationItems.push(
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} key="next">
                <button className="page-link" onClick={handleNext}>Next &raquo;</button>
            </li>
        );

        return paginationItems;
    };

    return (
        <div className="container mt-4">
            <h1>Student News</h1>
            <div className="row">
                {currentArticles.map(article => (
                    <div className="col-md-4 mb-4" key={article.post_id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.content}</p>
                                <p className="card-text"><small className="text-muted">{article.date}</small></p>
                                <Link to={`/news/view/${article.post_id}`} className="btn btn-primary">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <nav>
                <ul className="pagination justify-content-center mt-4">
                    {renderPagination()}
                </ul>
            </nav>
        </div>
    );
};

export default News;
