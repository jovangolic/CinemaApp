import React from "react";

const TicketPaginator = ({currentPage, totalPages, onPageChange}) => {
    //kreiranje liste prema dobijenom rezultatu pretrage
    const pageNumbers = Array.from({length : totalPages}, (_, i) => i+1);

    return(
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} className={`page-item${currentPage === pageNumber ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>

                    </li>
                ))}

            </ul>
        </nav>
    );
};

export default TicketPaginator;