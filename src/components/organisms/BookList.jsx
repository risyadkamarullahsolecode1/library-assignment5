import React, {useState, useEffect} from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomButton from '../atoms/Button';
import apiClient from '../../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
      apiClient.get('/Book')
        .then(response => setBooks(response.data))
        .catch(error => console.error("Error fetching books:", error));
    }, []);

  const confirmDelete = (id) => {
    toast.warn("Are you sure you want to delete this book?", {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: true,
      draggable: false,
      pauseOnHover: true,
      hideProgressBar: true,
      onClose: () => {},  // No action on close
      onClick: () => handleDelete(id)  // Proceed with deletion on click
    });
  };
  
  const handleDelete = (id) => {
    apiClient.delete(`/Book/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
        toast.success("Book deleted successfully!");
      })
      .catch((error) => toast.error("Error deleting book."));
  };

  return (
    <>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Description</th>
          <th>Language</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{book.description}</td>
            <td>{book.language}</td>
            <td>{book.location}</td>
            <td>
              <Link to={`/books/${book.id}`}>
                <Button variant="info" size="sm">View</Button>
              </Link>
              <Link to={`/books/edit/${book.id}`} className="ms-2">
                <Button variant="warning" size="sm">Edit</Button>
              </Link>
              <CustomButton
                variant="danger"
                size="sm"
                onClick={() => confirmDelete(book.id)}
              >
                Delete
              </CustomButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <ToastContainer />
  </>
  );
};

export default BookList;
