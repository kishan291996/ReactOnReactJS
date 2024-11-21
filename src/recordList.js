import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RecordsList = () => {
  const records = useSelector(state => state.records);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_RECORD', payload: id });
  };

  const onNext = () =>{
    navigate('/table')
  }
  return (
    <div>
      <h1>Records</h1>
      <ul>
        {records.map(record => (
          <li key={record.id}>
            {record.name} - {record.email} - {record.contactNo} - {record.selectedEmployee} - {record.address}
            <button onClick={() => handleEdit(record.id)}>Edit</button>
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => onNext()}>Next</button>
    </div>
  );
};

export default RecordsList;
