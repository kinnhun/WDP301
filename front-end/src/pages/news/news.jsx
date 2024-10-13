import { useState } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link

const News = () => {
    // Sample data for news articles
    const newsArticles = [
        { id: 1, title: "Breaking News 1", content: "This is a brief description of breaking news 1.", date: "2024-10-01" },
        { id: 2, title: "Breaking News 2", content: "This is a brief description of breaking news 2.", date: "2024-10-02" },
        { id: 3, title: "Breaking News 3", content: "This is a brief description of breaking news 3.", date: "2024-10-03" },
        { id: 4, title: "Breaking News 4", content: "This is a brief description of breaking news 4.", date: "2024-10-04" },
        { id: 5, title: "Breaking News 5", content: "This is a brief description of breaking news 5.", date: "2024-10-05" },
        { id: 6, title: "Breaking News 6", content: "This is a brief description of breaking news 6.", date: "2024-10-06" },
        { id: 7, title: "Breaking News 7", content: "This is a brief description of breaking news 7.", date: "2024-10-07" },
        { id: 8, title: "Breaking News 8", content: "This is a brief description of breaking news 8.", date: "2024-10-08" },
        { id: 9, title: "Breaking News 9", content: "This is a brief description of breaking news 9.", date: "2024-10-09" },
        { id: 10, title: "Breaking News 10", content: "This is a brief description of breaking news 10.", date: "2024-10-10" },
    ];

    const itemsPerPage = 3; // Number of articles to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the number of pages
    const totalPages = Math.ceil(newsArticles.length / itemsPerPage);

    // Get current articles based on the page
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

        // Logic for displaying page numbers with ellipses
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
                    <div className="col-md-4 mb-4" key={article.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.content}</p>
                                <p className="card-text"><small className="text-muted">{article.date}</small></p>
                                <Link to={`/news/${article.id}`} className="btn btn-primary">Read More</Link>
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
