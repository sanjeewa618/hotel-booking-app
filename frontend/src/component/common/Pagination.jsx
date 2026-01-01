import React from 'react';

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalRooms / roomsPerPage);
  
  // Don't show pagination if there's only one page or no rooms
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4; // Show max 4 page numbers at a time
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Always show first page
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }
    
    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

 const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className='pagination-nav'>
      <ul className="pagination-ul">
        <li className="pagination-li">
          <button 
            onClick={handlePrevious} 
            className="pagination-button"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        
        {getPageNumbers().map((number, index) => (
          <li key={index} className="pagination-li">
            {number === '...' ? (
              <span className="pagination-ellipsis">...</span>
            ) : (
              <button 
                onClick={() => paginate(number)} 
                className={`pagination-button ${currentPage === number ? 'current-page' : ''}`}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        
        <li className="pagination-li">
          <button 
            onClick={handleNext} 
            className="pagination-button"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

