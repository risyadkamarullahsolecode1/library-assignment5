import React from 'react';
import { Link } from 'react-router-dom';
import BorrowList from '../organisms/BorrowList';
import { Button } from 'react-bootstrap';

const BorrowPage = () => {
  return (
    <div>
      <h1>Borrow Books</h1>
      <Link to="/borrow/form">
        <Button variant="primary">Borrow Book</Button>
      </Link>
      <BorrowList />
    </div>
  );
};

export default BorrowPage;
