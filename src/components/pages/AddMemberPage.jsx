import React from 'react';
import MemberForm from '../molecules/MemberForm';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import apiClient from '../../axiosConfig';

const AddMemberPage = () => {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleAddMember = (memberData) => {
    apiClient
      .post('/User', memberData) // POST request to add a new member
      .then(() => {
        toast.success('Member added successfully!');
        navigate('/members'); // Navigate to the members list page after successful addition
      })
      .catch(() => {
        toast.error('Failed to add member.');
      });
  };

  return (
    <Container>
      <h1>Add New Member</h1>
      <MemberForm onSubmit={handleAddMember} /> {/* Pass the onSubmit function */}
    </Container>
  );
};

export default AddMemberPage;
