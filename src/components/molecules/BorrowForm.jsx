import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import apiClient from '../../axiosConfig';

const BorrowForm = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [bookId, setBookId] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!userId) newErrors.userId = "User ID is required.";
        if (!bookId) newErrors.bookId = "Book ID is required.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                await apiClient.post(`/BookManager/borrow?userId=${userId}&bookId=${bookId}`);
                toast.success("Book borrowed successfully!");
                navigate('/borrow'); // Redirect to the borrow list page
            } catch (error) {
                toast.error(error.response?.data || "Error borrowing the book.");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "userId") setUserId(value);
        if (name === "bookId") setBookId(value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userId">
                <Form.Label>User ID</Form.Label>
                <Form.Control 
                    type="number" 
                    name="userId" 
                    value={userId} 
                    onChange={handleChange} 
                    isInvalid={!!errors.userId} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.userId}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="bookId">
                <Form.Label>Book ID</Form.Label>
                <Form.Control 
                    type="number" 
                    name="bookId" 
                    value={bookId} 
                    onChange={handleChange} 
                    isInvalid={!!errors.bookId} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.bookId}
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
                Borrow Book
            </Button>

            <ToastContainer />
        </Form>
    );
};

export default BorrowForm;
