import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import BookForm from '../molecules/BookForm';
import apiClient from '../../axiosConfig';

const EditBookPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient.get(`/Book/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load book details.');
                setLoading(false);
            });
    }, [id]);

    const handleUpdateBook = (updatedBook) => {
        apiClient.put(`/Book/${id}`, { ...updatedBook, id })
            .then(() => {
                toast.success('Book updated successfully!');
                navigate('/books'); // Redirect to the books list page
            })
            .catch(() => {
                toast.error('Failed to update book.');
            });
    };

    return (
        <Container>
            <h1>Edit Book</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <BookForm initialData={book} onSubmit={handleUpdateBook} />
            )}
        </Container>
    );
};

export default EditBookPage;
