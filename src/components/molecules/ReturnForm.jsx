import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import CustomButton from '../atoms/Button';
import apiClient from '../../axiosConfig';

const ReturnForm = () => {
  const navigate = useNavigate();

  const [returnData, setReturnData] = useState({
    userId: '',
    bookId: '',
    tanggalKembali: '',  // This will be the return date
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!returnData.userId) newErrors.userId = "User ID is required.";
    if (!returnData.bookId) newErrors.bookId = "Book ID is required.";
    if (!returnData.tanggalKembali) newErrors.tanggalKembali = "Return date is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        const { userId, bookId, tanggalKembali } = returnData;
        
        apiClient.post(`/BookManager/return?userId=${userId}&bookId=${bookId}`, { tanggalKembali })
            .then(() => {
                toast.success("Book returned successfully!");
                navigate('/return');  // Redirect to return list page
            })
            .catch(() => toast.error("Error returning book."));
    }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReturnData((prevData) => ({ ...prevData, [name]: value }));
    };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="userId">
        <Form.Label>User ID</Form.Label>
        <Form.Control
          type="text"
          name="userId"
          value={returnData.userId}
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
          type="text"
          name="bookId"
          value={returnData.bookId}
          onChange={handleChange}
          isInvalid={!!errors.bookId}
        />
        <Form.Control.Feedback type="invalid">
          {errors.bookId}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="tanggalKembali">
        <Form.Label>Return Date</Form.Label>
        <Form.Control
          type="date"
          name="tanggalKembali"
          value={returnData.tanggalKembali}
          onChange={handleChange}
          isInvalid={!!errors.tanggalKembali}
        />
        <Form.Control.Feedback type="invalid">
          {errors.tanggalKembali}
        </Form.Control.Feedback>
      </Form.Group>

      <CustomButton type="submit">Return Book</CustomButton>

      <ToastContainer />
    </Form>
  );
};

export default ReturnForm;
