// src/components/pages/MemberDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import apiClient from '../../axiosConfig';

const MemberDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  // Fetch book details based on ISBN or ID from API
  apiClient.get(`/User/${id}`)
    .then((response) => {
      setMember(response.data);
      setLoading(false);
    })
    .catch((err) => {
      setError("Failed to load user details.");
      setLoading(false);
    });
}, [id]);

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;
if (!member) return <div>Member not found</div>;

  return (
    <Container className="mt-2">
      {member ? (
        <Card>
          <Card.Header as="h5">Member Details</Card.Header>
          <Card.Body>
            <Card.Title>{member.name}</Card.Title>
            <Card.Text>
              <strong>Name :</strong> {member.FirstName} {member.lastName}
            </Card.Text>
            <Card.Text>
              <strong>Library Card Number:</strong> {member.libraryCardNumber}
            </Card.Text>
            <Card.Text>
              <strong>Library Card Exp Date</strong> {member.libraryCardExpDate}
            </Card.Text>
            <Card.Text>
              <strong>Position</strong> {member.position}
            </Card.Text>
            <Card.Text>
              <strong>Previlege</strong> {member.previlege}
            </Card.Text>
            <Card.Text>
              <strong>Note</strong> {member.note}
            </Card.Text>
            <Button variant="primary" onClick={() => navigate('/members')}>
              Back to Members List
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading member details...</p>
      )}
    </Container>
  );
};

export default MemberDetailPage;
