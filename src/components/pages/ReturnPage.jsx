import React from 'react';
import { Link } from 'react-router-dom';
import ReturnList from '../organisms/ReturnList';
import { Button } from 'react-bootstrap';

const ReturnPage = () => {
  return (
    <div>
      <h1>Return Books</h1>
      <Link to="/return/form">
        <Button variant="primary">Return Book</Button>
      </Link>
      <ReturnList />
    </div>
  );
};

export default ReturnPage;
