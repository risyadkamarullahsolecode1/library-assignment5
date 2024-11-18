import React, {useState,useEffect} from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MemberList from '../organisms/MemberList';
import apiClient from '../../axiosConfig';

const MemberPage = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch books from API
      apiClient.get('/User')
        .then((response) => {
          setMembers(response.data);
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
      <h1>Members</h1>
      <Link to="/members/add">
        <Button variant="primary" className="mb-3">Add New Member</Button>
      </Link>
      <MemberList members={members} />
    </Container>
  );
};

export default MemberPage;
