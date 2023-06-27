/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

// Declaring a variable for the amount and size of data to be displayed per page
const pageSize = 10;
// Declaration ended

const Posts = () => {
  // setting state to display  table data
  const [posts, setPosts] = useState();

  //   setting a state to display the first ten datas
  const [paginatedPosts, setPaginatedPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // setting states for loadings
 const [loading, setLoading] = useState(true)
 const [data, setData] = useState([])

useEffect(() => {
  const fetchData=(() => {
    setLoading(true)
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      // console.log(res.data); //getting data from the api call
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      setData (res.data)
      setPosts(res.data);
      setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
    })
    .catch (error => {
      console.log(error);
      setLoading(flse)
    });
  });
  fetchData();
},[])
  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
  if (pageCount === 1) return null;

  // using loadash dependency to load the pages
  const pages = _.range(1, pageCount + 1);

  // creating our pagination function
  const pagination = (pageNo) => {
    setLoading(true);
    axios
        .get(' http://localhost:5000/users')
        .then(response => {
          setLoading(false)
          setData(response.data);
          setPosts(res.data);
          setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    setCurrentPage(pageNo);
    const startIndex = (pageNo -1) * pageSize;
    const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost)
  };
  return (
    <div>
    {loading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div
          style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
      </div>
    ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              // mapping through
              paginatedPosts.map((post, index) => (
                <tr key={index}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>

                  {/* checking the status of the post request */}
                  <td>
                    <p style={{width: "100px", height: "40px"}}
                      className={
                        post.completed ? "btn btn-success" : "btn btn-danger"
                      }
                    >
                      {post.completed ? "Completed" : "Pending"}
                    </p>
                  </td>
                </tr>
              ))
              
            }
          </tbody>
        </table>
        
      )}

      {/* creating paginations */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
             <p className="page-link"
             onClick={() =>pagination(page)}
             >{page}</p>
            </li>
          ))}
          
        </ul>
      </nav>
 </div>
 
  );
  
};

export default Posts;
