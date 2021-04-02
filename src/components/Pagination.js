import React from 'react';

const Pagination = ({tablePosts, postsPerPage, paginate}) => {

    let pageNumbers = [];

    for (let i = 1; i < Math.ceil(tablePosts / postsPerPage); i++) {
         pageNumbers.push(i);
    }
    return(
        <div className='container container-d-b'>
            <ul className='pagination-list'>
                {pageNumbers.map(number => (
                    <li key={number} className='pagination-list-item'>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    )

};

export default Pagination;