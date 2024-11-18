import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import apiClient from '../../axiosConfig';

const HomePage = () => {
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const response = await apiClient.get('/Book'); // Adjust the endpoint to match your API route
        setBookCount(response.data.length); // Assuming response.data contains an array of books
      } catch (error) {
        console.error('Error fetching book count:', error);
      }
    };

    // Fetch member count from API
    const fetchUserCount = async () => {
      try {
        const response = await apiClient.get('/User'); // Adjust the endpoint to match your API route
        setUserCount(response.data.length); // Assuming response.data contains an array of members
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchBookCount();
    fetchUserCount();
  }, []);

  return (
    <Container>
    <h1>Library Management System</h1>
    <p>Statistics and details about the library will be shown here.</p>

    <div>
      <h2>Library Statistics</h2>
      <p>Total Books: {bookCount}</p>
      <p>Total Members: {userCount}</p>
    </div>
  </Container>
  )
};

export default HomePage;
