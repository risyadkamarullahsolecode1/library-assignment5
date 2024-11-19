import React,{useState, useEffect} from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import BookList from '../organisms/BookList';
import apiClient from '../../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const BookManagemets = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books from API
    apiClient.get('/Book')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load books.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <h1>Books</h1>
      <Link to="/books/search">
        <Button variant="primary" className="mb-3">
            <FontAwesomeIcon icon={faMagnifyingGlass}/> Search
        </Button>
      </Link>
      <Link to="/books/add">
        <Button variant="primary" className="mb-3">Add New Book</Button>
      </Link>
      <BookList books={books} />
    </Container>
  );
};

export default BookManagemets;