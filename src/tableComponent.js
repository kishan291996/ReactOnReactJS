// src/TableComponent.js
import React, { useState, useEffect } from 'react';
// import React from 'react';
import { getData, postData } from './services/apiServices'
import { useSelector } from 'react-redux';

const TableComponent = ({ data }) => {
  const records = useSelector(state => state.records);

  const [data1, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [error, setError] = useState(null);

  useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await getData();
      setData(result); setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handlePost = async (e) => {
    e.preventDefault(); try {
      await postData(newPost);
      fetchData();
      // Fetch updated records after adding new post
      setNewPost({ title: '', body: '' });
      // Clear the form 
    } catch (error) { console.error('Error posting data:', error); }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <React.Fragment>
      <h1>Detail</h1>
      <form onSubmit={handlePost}>
        <input type="text" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Title" />
        <input type="text" value={newPost.body} onChange={e => setNewPost({ ...newPost, body: e.target.value })} placeholder="Body" /> <button type="submit">Add Post</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>

        <h1>Data from API</h1>
        <table>
          <thead>
            <tr> <th>Title</th> <th>Body</th> </tr>
          </thead>
          <tbody> {data1.map((item, index) => (<tr key={index}> <td>{item.id}</td> <td>{item.title}</td> </tr>))} </tbody>
        </table>
      </div>

      {records.map(record => (
          <li key={record.id}>
            {record.name} - {record.email} - {record.contactNo} - {record.selectedEmployee} - {record.address}            
          </li>
        ))}
    </React.Fragment>


  );
};

export default TableComponent;
