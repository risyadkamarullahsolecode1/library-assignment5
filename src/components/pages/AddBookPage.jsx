import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookForm from '../molecules/BookForm';
import apiClient from '../../axiosConfig';

const AddBookPage = () => {
  const navigate = useNavigate();

  const handleAddBook = (newBook) => {
    apiClient
      .post('/Book', newBook)
      .then(() => {
        toast.success('Book added successfully!');
        navigate('/books'); // Redirect to the books list page
      })
      .catch((error) => {
        toast.error(`Failed to add book: ${error.response?.data?.message || 'Unknown error'}`);
      });
  };

  return (
    <Container>
      <h1>Add New Book</h1>
      <BookForm onSubmit={handleAddBook} /> {/* Pass the onSubmit handler */}
    </Container>
  );
};

export default AddBookPage;
