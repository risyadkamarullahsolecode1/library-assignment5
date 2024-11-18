import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiClient from '../../axiosConfig';

const BorrowList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    apiClient.get('/BookManager/borrowBook')
      .then(response => setBorrowedBooks(response.data))
      .catch(error => console.error("Error fetching borrowed books:", error));
  }, []);

  const handleDelete = (id) => {
    apiClient.delete(`/BookManager/borrowBook/${id}`)
      .then(() => setBorrowedBooks(borrowedBooks.filter((borrow) => borrow.id !== id)))
      .catch((error) => console.error("Error deleting borrow record:", error));
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Book ID</th>
          <th>Borrow Date</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {borrowedBooks.map((borrow) => (
          <tr key={borrow.id}>
            <td>{borrow.userId}</td>
            <td>{borrow.bookId}</td>
            <td>{borrow.tanggalPinjam}</td>
            <td>{borrow.dueDate}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => handleDelete(borrow.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BorrowList;
