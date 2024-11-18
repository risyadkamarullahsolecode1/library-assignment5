import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import apiClient from '../../axiosConfig';

const ReturnList = () => {
  const [returnedBooks, setReturnedBooks] = useState([]);

  useEffect(() => {
    apiClient.get('/BookManager/borrowBook')
      .then(response => setReturnedBooks(response.data))
      .catch(error => console.error("Error fetching returned books:", error));
  }, []);

  const handleDelete = (id) => {
    apiClient.delete(`/BookManager/borrowBook/${id}`)
      .then(() => setReturnedBooks(returnedBooks.filter((returnRecord) => returnRecord.id !== id)))
      .catch((error) => console.error("Error deleting return record:", error));
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Book ID</th>
          <th>Tanggal Pinjam</th>
          <th>Return Date</th>
          <th>Penalty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {returnedBooks.map((returnRecord) => (
          <tr key={returnRecord.id}>
            <td>{returnRecord.userId}</td>
            <td>{returnRecord.bookId}</td>
            <td>{returnRecord.tanggalPinjam}</td>
            <td>{returnRecord.tanggalKembali}</td>
            <td>{returnRecord.penalty}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => handleDelete(returnRecord.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReturnList;
