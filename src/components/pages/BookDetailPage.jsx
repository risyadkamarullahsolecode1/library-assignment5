import React, {useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import apiClient from '../../axiosConfig';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch book details based on ISBN or ID from API
    apiClient.get(`/Book/${id}/details`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load book details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div>
      {book ? (
        <Card>
          <Card.Header as="h5">Book Details</Card.Header>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              <strong>Title :</strong> {book.author}
            </Card.Text>
            <Card.Text>
              <strong>Category :</strong> {book.category}
            </Card.Text>
            <Card.Text>
              <strong>ISBN :</strong> {book.isbn}
            </Card.Text>
            <Card.Text>
              <strong>Publisher :</strong> {book.publisher}
            </Card.Text>
            <Card.Text>
              <strong>Description :</strong> {book.description}
            </Card.Text>
            <Card.Text>
              <strong>Language :</strong> {book.language}
            </Card.Text>
            <Card.Text>
              <strong>Location : </strong> {book.location}
            </Card.Text>
            <Button variant="primary" onClick={() => navigate('/books')}>
              Back to Book List
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetailPage;
