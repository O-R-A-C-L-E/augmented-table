import './App.css';
import { useState, useEffect } from 'react'
import {SortableTable} from "./components/SortableTable";
import Pagination from "./components/Pagination";

function App() {
  const [tablePosts, setTablePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);


  useEffect(() => {
    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setTablePosts(data))
        .catch(err => alert(err.status + err.message));

    setIsLoading(false);
  },[]);

  //Get currentPosts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tablePosts.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  };



  return (
    <div className='wrapper'>
      <SortableTable tablePosts={currentPosts} isLoading={isLoading}/>
      <Pagination tablePosts={tablePosts.length} postsPerPage={postsPerPage} paginate={paginate}/>
    </div>
  );
}

export default App;
